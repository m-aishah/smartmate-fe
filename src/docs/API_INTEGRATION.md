
# API Integration Guide

## Quick Setup Checklist

### 1. Environment Setup
- [ ] Set `VITE_API_BASE_URL` environment variable
- [ ] Update `src/lib/env.ts` if needed
- [ ] Uncomment environment validation in `src/lib/env.ts`

### 2. Authentication
- [ ] Verify JWT token format matches your backend
- [ ] Update auth service error handling if needed
- [ ] Test login/logout flow

### 3. Components to Update

#### Dashboard Components
- [ ] **QuoteCard**: Uncomment API calls, remove mock data
- [ ] **RecentLecturesCard**: Uncomment API calls, remove mock data  
- [ ] **WelcomeSection**: Uncomment API calls, remove mock data
- [ ] **DeadlinesCard**: Add API integration (when endpoint available)
- [ ] **TasksCard**: Add API integration (when endpoint available)

#### Lecture Components
- [ ] **LectureGrid**: Update to use `useLectures()` hook
- [ ] **LectureCard**: Integrate with lecture API
- [ ] **LectureDetailModal**: Connect to lecture details API

#### Quiz Components
- [ ] **QuizService**: Uncomment API calls, remove mock data
- [ ] Update quiz and flashcard components

### 4. Services Integration

All services are ready for API integration:
- ✅ **AuthService**: Ready
- ✅ **UserService**: Ready  
- ✅ **LectureService**: Ready
- ✅ **SummaryService**: Ready
- ✅ **ChatService**: Ready
- ✅ **QuoteService**: Ready

### 5. Custom Hooks

Use these hooks in your components:
- `useLectures()` - Get all lectures
- `useUserProfile()` - Get user profile
- `useDashboardData()` - Get dashboard data
- `useQuotes()` - Get quotes
- `useCreateLecture()` - Upload lectures
- `useUpdateProfile()` - Update user profile

## Step-by-Step Integration

### Step 1: Environment Variables
```bash
# In your .env file (for local development)
VITE_API_BASE_URL=http://localhost:3000/api

# For production, set this in your hosting platform
```

### Step 2: Test API Connection
1. Uncomment the environment validation in `src/lib/env.ts`
2. Start your backend server
3. Try logging in to test the connection

### Step 3: Replace Mock Data
Search for "TODO" comments in these files and follow the instructions:

1. **src/components/dashboard/QuoteCard.tsx**
   - Uncomment `useQuery` hook
   - Remove `mockQuotes` and related logic
   - Add `quotes` to useEffect dependency array

2. **src/components/dashboard/RecentLecturesCard.tsx**
   - Uncomment `useQuery` hook
   - Replace `mockLectures` with `lectures` from API
   - Uncomment loading state

3. **src/components/dashboard/WelcomeSection.tsx**
   - Uncomment `useQuery` hook
   - Replace `mockUser` with `user` from API
   - Uncomment loading state

4. **src/services/QuizService.ts**
   - Uncomment all API calls
   - Remove mock data returns
   - Update error handling

### Step 4: Error Handling
Update error handling in `src/lib/api-client.ts` based on your backend's error response format.

### Step 5: Type Safety
Verify that your backend responses match the TypeScript interfaces in `src/services/types/`.

## Common Issues

### 1. CORS Errors
Make sure your backend allows requests from your frontend domain.

### 2. Authentication Issues
- Verify JWT token format
- Check token expiration handling
- Ensure auth headers are correctly set

### 3. Endpoint Mismatches
- Compare `src/constants/endpoints.ts` with your actual backend routes
- Update endpoints if your backend routes differ

### 4. Type Mismatches
- Update TypeScript interfaces in `src/services/types/` to match your backend
- Ensure consistent naming conventions

## Testing Your Integration

1. **Authentication Flow**
   - Register new user
   - Login/logout
   - Protected route access

2. **Data Operations**
   - Upload lecture
   - View lectures
   - Update profile
   - Create quiz/flashcard

3. **Error Handling**
   - Network errors
   - Validation errors
   - Authentication errors

## Future Endpoints

When you implement these backend routes, uncomment the related services:

- Analytics endpoints (`/analytics/*`)
- Notification endpoints (`/notifications/*`)
- Todo endpoints (`/todos/*`)
- Deadline endpoints (`/deadlines/*`)
- Quiz/Flashcard endpoints (`/quizzes/*`, `/flashcards/*`)

Each endpoint group has corresponding services ready for integration.
