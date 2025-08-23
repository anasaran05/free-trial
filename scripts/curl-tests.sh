#!/bin/bash

# Google Sheets Progress API Integration Tests
# Usage: ./scripts/curl-tests.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SUPABASE_URL="https://orcusrkjjpdxtxkjefki.supabase.co"
USER_ID="your-test-user-id-here"
JWT_TOKEN=""

echo -e "${YELLOW}Google Sheets Progress API Tests${NC}"
echo "=================================="

# Function to get JWT token (you'll need to implement this based on your auth setup)
get_jwt_token() {
    echo -e "${YELLOW}Getting JWT token...${NC}"
    
    # Test login endpoint - adjust this URL based on your auth setup
    # For now, we'll use a placeholder
    JWT_TOKEN="your-jwt-token-here"
    
    if [ "$JWT_TOKEN" = "your-jwt-token-here" ]; then
        echo -e "${RED}ERROR: Please set your JWT token in the script${NC}"
        echo "You can get it from your browser's developer tools after logging in"
        exit 1
    fi
    
    echo -e "${GREEN}JWT token obtained${NC}"
}

# Test 1: GET user progress
test_get_progress() {
    echo -e "\n${YELLOW}Test 1: GET /api/progress/${USER_ID}${NC}"
    
    response=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer $JWT_TOKEN" \
        -H "Content-Type: application/json" \
        "${SUPABASE_URL}/functions/v1/sheets-progress/api/progress/${USER_ID}")
    
    body=$(echo "$response" | head -n -1)
    status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response: $body"
    
    if [ "$status_code" = "200" ]; then
        echo -e "${GREEN}✓ GET progress test passed${NC}"
    else
        echo -e "${RED}✗ GET progress test failed${NC}"
    fi
}

# Test 2: POST update progress
test_post_progress() {
    echo -e "\n${YELLOW}Test 2: POST /api/progress/${USER_ID}${NC}"
    
    payload='{
        "CourseId": "test_course_1",
        "ChapterId": "test_chapter_1", 
        "LessonId": "test_lesson_1",
        "TaskId": "test_task_1",
        "TaskCompleted": true,
        "QuizScore": 85
    }'
    
    response=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -H "Authorization: Bearer $JWT_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "${SUPABASE_URL}/functions/v1/sheets-progress/api/progress/${USER_ID}")
    
    body=$(echo "$response" | head -n -1)
    status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response: $body"
    
    if [ "$status_code" = "200" ]; then
        echo -e "${GREEN}✓ POST progress test passed${NC}"
    else
        echo -e "${RED}✗ POST progress test failed${NC}"
    fi
}

# Test 3: POST batch update
test_batch_progress() {
    echo -e "\n${YELLOW}Test 3: POST /api/progress/batch${NC}"
    
    payload='[
        {
            "userId": "'$USER_ID'",
            "CourseId": "test_course_1",
            "ChapterId": "test_chapter_1", 
            "LessonId": "test_lesson_1",
            "TaskId": "test_task_2",
            "TaskCompleted": true
        },
        {
            "userId": "'$USER_ID'",
            "CourseId": "test_course_1",
            "ChapterId": "test_chapter_1", 
            "LessonId": "test_lesson_1",
            "TaskId": "test_task_3",
            "TaskCompleted": false
        }
    ]'
    
    response=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -H "Authorization: Bearer $JWT_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "${SUPABASE_URL}/functions/v1/sheets-progress/api/progress/batch")
    
    body=$(echo "$response" | head -n -1)
    status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response: $body"
    
    if [ "$status_code" = "200" ]; then
        echo -e "${GREEN}✓ Batch progress test passed${NC}"
    else
        echo -e "${RED}✗ Batch progress test failed${NC}"
    fi
}

# Test 4: Verify data in sheet (GET again)
test_verify_data() {
    echo -e "\n${YELLOW}Test 4: Verify data persistence${NC}"
    
    response=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer $JWT_TOKEN" \
        -H "Content-Type: application/json" \
        "${SUPABASE_URL}/functions/v1/sheets-progress/api/progress/${USER_ID}")
    
    body=$(echo "$response" | head -n -1)
    status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response: $body"
    
    # Check if the response contains our test data
    if echo "$body" | grep -q "test_task_1"; then
        echo -e "${GREEN}✓ Data persistence verified${NC}"
    else
        echo -e "${RED}✗ Data persistence verification failed${NC}"
    fi
}

# Test 5: Error handling - unauthorized access
test_unauthorized() {
    echo -e "\n${YELLOW}Test 5: Unauthorized access test${NC}"
    
    response=$(curl -s -w "\n%{http_code}" \
        -H "Content-Type: application/json" \
        "${SUPABASE_URL}/functions/v1/sheets-progress/api/progress/${USER_ID}")
    
    body=$(echo "$response" | head -n -1)
    status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response: $body"
    
    if [ "$status_code" = "401" ]; then
        echo -e "${GREEN}✓ Unauthorized access properly rejected${NC}"
    else
        echo -e "${RED}✗ Unauthorized access test failed${NC}"
    fi
}

# Main execution
main() {
    echo -e "${YELLOW}Starting API tests...${NC}"
    
    # Check if USER_ID is set
    if [ "$USER_ID" = "your-test-user-id-here" ]; then
        echo -e "${RED}ERROR: Please set USER_ID in the script${NC}"
        exit 1
    fi
    
    get_jwt_token
    test_get_progress
    test_post_progress
    test_batch_progress
    test_verify_data
    test_unauthorized
    
    echo -e "\n${YELLOW}All tests completed!${NC}"
    echo -e "${GREEN}Check the Google Sheet to verify data was written correctly.${NC}"
}

# Run the tests
main