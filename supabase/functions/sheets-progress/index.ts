import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProgressData {
  CourseId: string;
  ChapterId: string;
  LessonId: string;
  QuizScore?: number;
  SimulationUnlocked?: boolean;
  TaskId: string;
  TaskCompleted?: boolean;
  LessonCompleted?: boolean;
}

// Cache for storing progress data (simple in-memory cache)
const cache = new Map<string, { data: any[], timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Google Sheets API helper functions
class GoogleSheetsAPI {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const serviceAccountEmail = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!serviceAccountEmail || !privateKey) {
      throw new Error('Missing Google service account credentials');
    }

    // Decode base64 private key
    const decodedKey = atob(privateKey).replace(/\\n/g, '\n');

    // Create JWT for Google API
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600; // 1 hour

    const header = {
      alg: 'RS256',
      typ: 'JWT'
    };

    const payload = {
      iss: serviceAccountEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: exp,
      iat: now
    };

    // For this example, we'll use a simpler approach with fetch to Google's API
    // In production, you'd want to properly implement JWT signing
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: await this.createJWT(header, payload, decodedKey)
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      throw new Error(`Google API auth error: ${tokenData.error_description || tokenData.error}`);
    }

    this.accessToken = tokenData.access_token;
    this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000; // Refresh 1 min early

    return this.accessToken;
  }

  private async createJWT(header: any, payload: any, privateKey: string): Promise<string> {
    // This is a simplified JWT creation. In production, use a proper JWT library
    const encoder = new TextEncoder();
    
    const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    const signatureInput = `${headerB64}.${payloadB64}`;
    
    // Import the private key for signing
    const keyData = privateKey.replace('-----BEGIN PRIVATE KEY-----', '')
                            .replace('-----END PRIVATE KEY-----', '')
                            .replace(/\s/g, '');
    
    const keyBuffer = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
    
    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      keyBuffer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256'
      },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      encoder.encode(signatureInput)
    );

    const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
                        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    return `${signatureInput}.${signatureB64}`;
  }

  async getSheetData(spreadsheetId: string, range: string): Promise<any[][]> {
    const token = await this.getAccessToken();
    
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google Sheets API error: ${error}`);
    }

    const data = await response.json();
    return data.values || [];
  }

  async updateSheetData(spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    const token = await this.getAccessToken();
    
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: values
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google Sheets API error: ${error}`);
    }
  }

  async appendSheetData(spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    const token = await this.getAccessToken();
    
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: values
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google Sheets API error: ${error}`);
    }
  }
}

const sheetsAPI = new GoogleSheetsAPI();

// Helper functions
function mapRowToObject(headers: string[], row: string[]): any {
  const obj: any = {};
  headers.forEach((header, index) => {
    obj[header] = row[index] || '';
  });
  return obj;
}

function objectToRow(headers: string[], obj: any): string[] {
  return headers.map(header => String(obj[header] || ''));
}

async function getUserProgressFromSheet(userId: string): Promise<any[]> {
  const cacheKey = `user_${userId}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log(`Cache hit for user ${userId}`);
    return cached.data;
  }

  const spreadsheetId = Deno.env.get('GOOGLE_SHEET_ID');
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID not configured');
  }

  try {
    const sheetData = await sheetsAPI.getSheetData(spreadsheetId, 'Sheet1!A:I');
    
    if (sheetData.length === 0) {
      return [];
    }

    const headers = sheetData[0];
    const rows = sheetData.slice(1);
    
    // Filter rows for the specific user
    const userRows = rows
      .filter(row => row[0] === userId) // Assuming UserId is first column
      .map(row => mapRowToObject(headers, row));

    // Cache the result
    cache.set(cacheKey, { data: userRows, timestamp: Date.now() });
    
    return userRows;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
}

async function upsertUserProgress(userId: string, progressData: ProgressData): Promise<void> {
  const spreadsheetId = Deno.env.get('GOOGLE_SHEET_ID');
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID not configured');
  }

  try {
    // Get current sheet data to find headers and existing row
    const sheetData = await sheetsAPI.getSheetData(spreadsheetId, 'Sheet1!A:I');
    
    if (sheetData.length === 0) {
      throw new Error('Sheet is empty or headers not found');
    }

    const headers = sheetData[0];
    const rows = sheetData.slice(1);
    
    // Create row data with UserId
    const rowData = {
      UserId: userId,
      ...progressData
    };

    // Find existing row for this user + task combination
    const existingRowIndex = rows.findIndex(row => 
      row[0] === userId && 
      row[headers.indexOf('TaskId')] === progressData.TaskId
    );

    if (existingRowIndex >= 0) {
      // Update existing row
      const updatedRow = objectToRow(headers, rowData);
      const range = `Sheet1!A${existingRowIndex + 2}:I${existingRowIndex + 2}`;
      await sheetsAPI.updateSheetData(spreadsheetId, range, [updatedRow]);
    } else {
      // Append new row
      const newRow = objectToRow(headers, rowData);
      await sheetsAPI.appendSheetData(spreadsheetId, 'Sheet1!A:I', [newRow]);
    }

    // Invalidate cache for this user
    cache.delete(`user_${userId}`);
    
  } catch (error) {
    console.error('Error upserting user progress:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate Supabase JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client for JWT validation
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { Authorization: authHeader }
      }
    });

    // Verify JWT and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid JWT token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    // Route: GET /api/progress/:userId
    if (req.method === 'GET' && pathParts[0] === 'api' && pathParts[1] === 'progress' && pathParts[2]) {
      const requestedUserId = pathParts[2];
      
      // Ensure user can only access their own data
      if (user.id !== requestedUserId) {
        return new Response(
          JSON.stringify({ error: 'Access denied: can only access own progress' }),
          { 
            status: 403, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      const progressData = await getUserProgressFromSheet(requestedUserId);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: progressData,
          userId: requestedUserId 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Route: POST /api/progress/:userId
    if (req.method === 'POST' && pathParts[0] === 'api' && pathParts[1] === 'progress' && pathParts[2]) {
      const requestedUserId = pathParts[2];
      
      // Ensure user can only update their own data
      if (user.id !== requestedUserId) {
        return new Response(
          JSON.stringify({ error: 'Access denied: can only update own progress' }),
          { 
            status: 403, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      const body = await req.json();
      
      // Validate required fields
      if (!body.CourseId || !body.ChapterId || !body.LessonId || !body.TaskId) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields: CourseId, ChapterId, LessonId, TaskId' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      await upsertUserProgress(requestedUserId, body);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Progress updated successfully',
          userId: requestedUserId 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Route: POST /api/progress/batch
    if (req.method === 'POST' && pathParts[0] === 'api' && pathParts[1] === 'progress' && pathParts[2] === 'batch') {
      const body = await req.json();
      
      if (!Array.isArray(body) || body.length === 0) {
        return new Response(
          JSON.stringify({ error: 'Request body must be a non-empty array' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      const results = [];
      
      for (const progressItem of body) {
        try {
          // Validate each item has userId that matches authenticated user
          if (progressItem.userId !== user.id) {
            results.push({ 
              success: false, 
              error: 'Access denied: can only update own progress',
              item: progressItem 
            });
            continue;
          }

          await upsertUserProgress(progressItem.userId, progressItem);
          results.push({ success: true, item: progressItem });
        } catch (error) {
          results.push({ 
            success: false, 
            error: error.message,
            item: progressItem 
          });
        }
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          results: results 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Route not found
    return new Response(
      JSON.stringify({ error: 'Route not found' }),
      { 
        status: 404, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})