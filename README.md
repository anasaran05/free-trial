# Google Sheets Progress Integration

This project integrates Google Sheets as a secure progress store for the learning management system using Supabase Edge Functions.

## Features

- **Secure Backend API**: Supabase Edge Functions handle all Google Sheets operations
- **Real-time Progress Tracking**: Updates progress data in Google Sheets with optimistic UI
- **Authentication**: Supabase JWT-based user authentication and authorization
- **Optimistic Updates**: Immediate UI feedback with rollback on errors
- **Debounced Writes**: Batched and debounced writes to prevent API spam
- **Dynamic Schema**: Header mapping works regardless of column order

## Architecture

```
React Frontend → Supabase Edge Functions → Google Sheets API → Google Sheets
```

## Setup Instructions

### 1. Google Service Account Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the Google Sheets API
4. Create a service account:
   - Go to IAM & Admin > Service Accounts
   - Click "Create Service Account"
   - Download the JSON key file
5. Share your Google Sheet with the service account email (as Editor)

### 2. Environment Variables

Copy the service account details to your Supabase secrets:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The email from your service account
- `GOOGLE_PRIVATE_KEY`: Base64 encode the private key from the JSON file
- `GOOGLE_SHEET_ID`: The ID from your Google Sheet URL

### 3. Google Sheet Setup

Create a Google Sheet with these headers in row 1:
```
UserId,CourseId,ChapterId,LessonId,QuizScore,SimulationUnlocked,TaskId,TaskCompleted,LessonCompleted
```

## API Endpoints

### GET /api/progress/:userId
Retrieve progress data for a specific user.

**Headers:**
- `Authorization: Bearer <supabase_jwt_token>`

**Response:**
```json
{
  "success": true,
  "data": [...],
  "userId": "user_id"
}
```

### POST /api/progress/:userId
Upsert progress data for a user.

**Headers:**
- `Authorization: Bearer <supabase_jwt_token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "CourseId": "course1",
  "ChapterId": "chapter1", 
  "LessonId": "lesson1",
  "TaskId": "task1",
  "TaskCompleted": true,
  "QuizScore": 85
}
```

### POST /api/progress/batch
Batch upsert multiple progress records.

**Headers:**
- `Authorization: Bearer <supabase_jwt_token>`
- `Content-Type: application/json`

**Body:**
```json
[
  {
    "userId": "user_id",
    "CourseId": "course1",
    "ChapterId": "chapter1",
    "LessonId": "lesson1", 
    "TaskId": "task1",
    "TaskCompleted": true
  }
]
```

## Testing

### Integration Tests

Run the curl test script:
```bash
chmod +x scripts/curl-tests.sh
./scripts/curl-tests.sh
```

### Manual Testing

1. Navigate to `/dashboard` in your app
2. Sign in with your Supabase account
3. Use the demo buttons to test progress updates
4. Verify data appears in your Google Sheet

## Local Development

1. Start the development server:
```bash
npm run dev
```

2. The app will be available at `http://localhost:5173`
3. Edge functions are automatically deployed and available

## Deployment

### Vercel
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy

### Netlify
1. Connect your GitHub repository  
2. Add environment variables in Netlify dashboard
3. Deploy

### Other Platforms
The app can be deployed to any platform that supports:
- Static file hosting
- Supabase Edge Functions

## Security Notes

- All Google API access goes through secure Edge Functions
- No Google credentials are exposed to the frontend
- User authentication is enforced on all endpoints
- Users can only access their own progress data

## Rate Limiting

Google Sheets API has the following limits:
- 100 requests per 100 seconds per user
- The system implements request queuing and exponential backoff

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check your Supabase JWT token
2. **403 Forbidden**: Verify the service account has access to the sheet
3. **Rate Limited**: The system will automatically retry with backoff

### Debug Mode

Check the Supabase Edge Function logs for detailed error information:
1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Check the logs for `sheets-progress` function

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License