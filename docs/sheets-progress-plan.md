# Google Sheets Progress Integration Plan

## Overview
This document outlines the architecture for integrating Google Sheets as a secure, real-time progress store for the learning management system using Supabase Edge Functions for backend security.

## Architecture

### Data Flow Diagram (Text)
```
Client (React) 
    ↓ Auth: Supabase JWT
    ↓ HTTP Requests
Supabase Edge Functions 
    ↓ Service Account Auth
    ↓ Google Sheets API
Google Sheets (Progress Store)
```

### Components
1. **Frontend (React)**: Progress tracking UI with optimistic updates
2. **Supabase Edge Functions**: Secure backend API layer
3. **Google Sheets**: Data persistence layer
4. **Authentication**: Supabase JWT validation

## API Endpoints

### 1. GET /api/progress/:userId
- **Purpose**: Retrieve progress data for a specific user
- **Authentication**: Supabase JWT required
- **Response**: JSON object with user progress data
- **Cache**: Server-side with 5-minute TTL
- **Error Handling**: 404 if user not found, 500 for system errors

### 2. POST /api/progress/:userId
- **Purpose**: Upsert progress data for a user
- **Authentication**: Supabase JWT required
- **Payload**: 
  ```json
  {
    "CourseId": "string",
    "ChapterId": "string", 
    "LessonId": "string",
    "QuizScore": "number",
    "SimulationUnlocked": "boolean",
    "TaskId": "string",
    "TaskCompleted": "boolean",
    "LessonCompleted": "boolean"
  }
  ```
- **Response**: Success confirmation or error details
- **Cache Invalidation**: Clears user's cached data on write

### 3. POST /api/progress/batch
- **Purpose**: Batch upsert multiple progress records
- **Authentication**: Supabase JWT required
- **Payload**: Array of progress objects
- **Response**: Batch operation results

## Security Strategy

### Authentication & Authorization
- All API requests require valid Supabase JWT tokens
- Edge Functions validate JWT and extract user ID
- User ID enforcement: Users can only access their own data
- No Google API keys or service account data exposed to frontend

### Google Service Account
- Service account credentials stored in Supabase secrets
- JWT-based authentication with Google APIs
- Minimal required permissions (spreadsheets.readonly, spreadsheets)

### Rate Limiting & Quotas
- Google Sheets API limits: 100 requests/100 seconds per user
- Implementation: Request queuing with exponential backoff
- Client-side debouncing: 2-second delay for write operations
- Batch operations to reduce API calls

## Data Management

### Schema Mapping
- Dynamic header resolution (no hardcoded column indexes)
- Header mapping: `UserId,CourseId,ChapterId,LessonId,QuizScore,SimulationUnlocked,TaskId,TaskCompleted,LessonCompleted`
- Data validation using Zod schemas

### Caching Strategy
- **Read Operations**: 5-minute TTL in Edge Function memory
- **Write Operations**: Immediate cache invalidation
- **Conflict Resolution**: Last-write-wins with timestamps

### Optimistic UI
- Immediate UI updates on user actions
- Rollback on server/network errors
- Visual feedback for pending operations

## Error Handling & Retry Strategy

### Error Categories
1. **Network Errors**: Retry with exponential backoff (max 3 attempts)
2. **Rate Limiting**: Queue requests with backoff
3. **Authentication Errors**: Clear tokens, redirect to login
4. **Data Validation**: Show user-friendly error messages

### Retry Strategy
```javascript
const retryConfig = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffFactor: 2
};
```

## Deployment Notes

### Environment Variables Required
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email
- `GOOGLE_PRIVATE_KEY`: Service account private key (base64 encoded)
- `GOOGLE_SHEET_ID`: Target spreadsheet ID

### Infrastructure
- Supabase Edge Functions (Deno runtime)
- Google Sheets API v4
- Client-side: React with TypeScript

### Performance Considerations
- Batch API calls when possible
- Debounced writes to prevent API spam
- Compressed payload sizes
- Connection pooling for Google API calls

## Testing Strategy

### Unit Tests
- Edge Function logic validation
- Data transformation functions
- Error handling scenarios

### Integration Tests
- End-to-end API flow testing
- Google Sheets read/write operations
- Authentication validation

### Load Testing
- Rate limit boundary testing
- Concurrent user scenarios
- Cache performance validation

## Monitoring & Observability

### Metrics to Track
- API response times
- Google Sheets API quota usage
- Error rates by endpoint
- Cache hit/miss ratios

### Logging
- Request/response logging in Edge Functions
- Google API call tracing
- Error stack traces with context

## Future Enhancements

### Potential Improvements
1. **Real-time Updates**: WebSocket connections for live progress
2. **Offline Support**: Local storage with sync capabilities
3. **Advanced Caching**: Redis integration for distributed cache
4. **Data Analytics**: Progress trend analysis and reporting
5. **Backup Strategy**: Automated data export and backup

### Scalability Considerations
- Multiple sheet support for large datasets
- Horizontal scaling with load balancing
- Database migration path if needed

## Security Audit Checklist

- [ ] Service account permissions minimized
- [ ] No secrets in client-side code
- [ ] JWT validation implemented
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Error messages don't leak sensitive data

## Success Metrics

### Performance Targets
- API response time < 500ms (95th percentile)
- Client-side update latency < 100ms
- Cache hit ratio > 80%
- Error rate < 1%

### User Experience Goals
- Seamless progress tracking
- Real-time visual feedback
- Graceful error recovery
- Minimal loading states