# Deployment Guide

## Deploy Everything on Vercel (Recommended)

This project uses Vercel Serverless Functions for the backend API, so you can host everything on Vercel for free.

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended for easy deployment)

### Step 2: Import Project
1. Click "Add New Project"
2. Import this repository from GitHub
3. Vercel will auto-detect the Vite framework

### Step 3: Configure Environment Variables
Add this environment variable in Vercel project settings:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://gleam_admin:Crazie13@gleam.991xcdg.mongodb.net/gleam?retryWrites=true&w=majority&appName=andrewmanyika` |

### Step 4: Deploy
Click "Deploy" - Vercel will build your frontend and deploy the API functions automatically.

### Step 5: Access Your Site
After deployment, you'll get a URL like:
- Landing Page: `https://your-project.vercel.app`
- Dashboard: `https://your-project.vercel.app/dashboard`
- API: `https://your-project.vercel.app/api/stats`

---

## Local Development

### Run Frontend + API locally
```bash
npm run dev
```

For local API development, you can also run:
```bash
npm run server
```

### Access
- Frontend: http://localhost:5173
- Dashboard: http://localhost:5173/dashboard
- Local API: http://localhost:3001/api (when running server separately)

---

## Alternative: Railway Backend (Optional)

If you prefer to host the backend separately on Railway:

### Railway Setup
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `FRONTEND_URL`: Your Vercel frontend URL
   - `NODE_ENV`: `production`

4. Add `VITE_API_URL` to your Vercel project pointing to Railway URL

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stats` | GET | Get ticket statistics |
| `/api/tickets` | GET | Get all tickets |
| `/api/tickets` | POST | Create new ticket sale |
| `/api/tickets/:id` | PATCH | Cancel/restore ticket (body: `{action: 'cancel'}` or `{action: 'restore'}`) |
| `/api/tickets/:id` | DELETE | Delete ticket permanently |
