cat > README.md <<'EOF'
sheets-backend - minimal express server to append progress to Google Sheets.

ENV:
- GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
- GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY (replace newlines with \\n when storing in secrets)
- GOOGLE_SHEET_ID

Run locally:
1. npm install
2. create a local .env (do NOT commit) with the above vars
3. npm run dev
4. POST JSON to http://localhost:4000/api/progress

Example:
curl -X POST http://localhost:4000/api/progress -H "Content-Type: application/json" -d '{"userId":"user_test_001","lessonId":"lesson_01","taskId":"task_01","lessonCompleted":true,"taskCompleted":true}'
EOF
