# Backend Setup

Quick setup:

1. Copy `.env.example` to `.env` and set `MONGO_URI`.
2. Install dependencies:

```bash
npm install
```

3. Run in development:

```bash
npm run dev
```

4. Production with Docker:

```bash
docker build -t devdash-backend .
docker run -e MONGO_URI="your_mongo_uri" -p 3000:3000 devdash-backend
```

Endpoints:
- `GET /api/health` — health check
- `POST /api/auth/signup` — local signup { username, password }
- `POST /api/auth/signin` — local signin { username, password }
- `POST /api/auth/google` — exchange Google ID token for JWT { id_token }
- `GET /api/me` — (protected) return current user info
- `POST /api/users` — create user (legacy)
- `GET /api/users/:id` — fetch user
- `GET /api/contests` — list upcoming contests (stub)
- `GET /api/providers/aggregate/:username` — aggregate stats

Notes:
- `server/scheduler.js` contains a placeholder cron job. Integrate provider APIs and notification channels there.

Frontend instructions (see `frontend/`):
1. `cd frontend && npm install`
2. Copy `.env.example` to `.env` and add your Google client ID if using OAuth.
3. `npm run dev` to start Vite with proxy to backend; the landing page will show a lavender‑beige theme with sign‑in/sign‑up forms over a transparent panel.
4. Build with `npm run build` and serve or generate static assets for deployment.
