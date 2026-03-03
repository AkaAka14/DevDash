# DevDash

A full-stack competitive programming dashboard that centralizes performance across multiple platforms and helps developers stay on top of upcoming contests.

## Backend
Node.js + Express server with MongoDB persistence. Use `docs/BACKEND_SETUP.md` for detailed setup, running, and deployment steps.

## Frontend
React app built with Vite (in `frontend/`). Lavendar/Beige theme, landing page with transparent sign-in/sign-up form, dashboard and utility tabs.

## Highlights
- **Provider integrations**: Codeforces (official API), LeetCode (GraphQL), CodeChef (scraped HTML).
- **Scheduler**: Cron-driven job for contest reminders and recommendations (stubbed). 
- **Authentication**: Full Google OAuth integration and local username/password signup with JWTs for session management.
- **UI components**: Dashboard for upcoming contests, notifications and bookmarks pages.

## Development
1. Run backend:
   ```bash
   npm install
   npm run dev
   ```
2. Run frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Navigate to `http://localhost:5173`, sign up or sign in to access dashboard.

## Next Steps
You can expand the system by:
- Implementing real contest APIs and personal recommendations.
- Finishing OAuth flow with token validation.
- Persisting notifications/bookmarks in MongoDB.
- Improving dashboard visuals and stats.

Enjoy exploring and customizing DevDash!

