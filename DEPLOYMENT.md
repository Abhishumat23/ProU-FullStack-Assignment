# Deployment Guide

## Quick Deploy (5 minutes)

### Step 1: Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `ProU-FullStack-Assignment`
4. Configure:
   - **Name**: `prou-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **"Create Web Service"**
6. Wait 2-3 minutes for deployment
7. Copy your backend URL (e.g., `https://prou-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import `ProU-FullStack-Assignment` repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://prou-backend.onrender.com/api` (your backend URL from Step 1)
6. Click **"Deploy"**
7. Wait 1-2 minutes for deployment

### Step 3: Update Backend CORS

After both are deployed, update the backend CORS settings:

1. In `backend/main.py`, find the CORS section
2. Add your frontend URL to `allow_origins`:
   ```python
   allow_origins=[
       "http://localhost:5173",
       "https://your-frontend.vercel.app",  # Add this
   ]
   ```
3. Commit and push to trigger redeploy

### Your Deployed URLs

- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://prou-backend.onrender.com`
- **API Docs**: `https://prou-backend.onrender.com/docs`

### Login Credentials

- **Admin**: admin@prothink.com / password123
- **Manager**: manager@prothink.com / manager123

---

## Alternative: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose `ProU-FullStack-Assignment`
5. Add environment variables if needed
6. Railway will auto-detect Python and deploy

---

## Alternative: Deploy Backend to Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Deploy
cd backend
flyctl launch
flyctl deploy
```

---

## Troubleshooting

### Backend doesn't start
- Check logs in Render dashboard
- Ensure all dependencies in requirements.txt
- Verify Python version matches

### Frontend can't connect to backend
- Check CORS settings in backend
- Verify API URL in frontend .env.production
- Check browser console for errors

### Database issues
- SQLite works on Render (persistent disk needed)
- For production, consider PostgreSQL on Render
- Database resets on free tier restarts

---

## Production Considerations

1. **Database**: Switch from SQLite to PostgreSQL for production
2. **Authentication**: Use proper JWT secret (environment variable)
3. **CORS**: Only allow your frontend domain
4. **Environment Variables**: Store secrets securely
5. **Monitoring**: Enable logs and monitoring on Render/Vercel

---

## Cost

- **Render Free Tier**: Backend hosting (sleeps after 15 min inactivity)
- **Vercel Free Tier**: Frontend hosting (unlimited)
- **Total**: $0/month for testing, ~$7/month for always-on backend
