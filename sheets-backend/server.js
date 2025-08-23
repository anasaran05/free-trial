cat > server.js <<'EOF'
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
app.use(bodyParser.json());

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getJWTClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!clientEmail || !privateKey) throw new Error('Missing Google service account envs');
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

app.post('/api/progress', async (req, res) => {
  try {
    const { userId, courseId, chapterId, lessonId, quizScore, simulationUnlocked, taskId, taskCompleted, lessonCompleted } = req.body;
    if (!userId || !lessonId) return res.status(400).json({ error: 'Missing required fields: userId, lessonId' });

    const auth = getJWTClient();
    await auth.authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) return res.status(500).json({ error: 'Missing GOOGLE_SHEET_ID env' });

    const now = new Date().toISOString();
    const row = [
      userId,
      courseId || '',
      chapterId || '',
      lessonId,
      quizScore ?? '',
      simulationUnlocked ?? '',
      taskId ?? '',
      taskCompleted ? 'TRUE' : 'FALSE',
      lessonCompleted ? 'TRUE' : 'FALSE',
      now
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });

    res.status(200).json({ ok: true, appended: true, metadata: result.data });
  } catch (err) {
    console.error('API error', err);
    res.status(500).json({ error: 'Server error', details: String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`sheets-backend listening on ${PORT}`));
EOF
