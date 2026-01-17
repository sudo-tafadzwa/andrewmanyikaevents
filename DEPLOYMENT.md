# Deployment Guide

## Backend Deployment on Railway (Free Tier)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (recommended for easy deployment)

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose this repository

### Step 3: Configure Environment Variables
In Railway dashboard, go to your project settings and add these variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://gleam_admin:Crazie13@gleam.991xcdg.mongodb.net/gleam?retryWrites=true&w=majority&appName=andrewmanyika` |
| `FRONTEND_URL` | Your Vercel/Netlify frontend URL (e.g., `https://your-app.vercel.app`) |
| `NODE_ENV` | `production` |

### Step 4: Deploy
Railway will automatically detect the `railway.json` and `Procfile` and deploy your backend.

### Step 5: Get Your Backend URL
After deployment, Railway will give you a URL like:
`https://your-project-name.railway.app`

Your API will be available at:
`https://your-project-name.railway.app/api`

---

## Frontend Deployment on Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project
1. Click "Add New Project"
2. Import this repository from GitHub

### Step 3: Configure Environment Variables
Add these environment variables in Vercel:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Railway backend URL + `/api` (e.g., `https://your-project.railway.app/api`) |

### Step 4: Deploy
Vercel will automatically build and deploy your frontend.

---

## Post-Deployment

### Update CORS
After getting your Vercel URL, go back to Railway and update the `FRONTEND_URL` environment variable with your Vercel domain.

### Access Dashboard
Your ticket dashboard will be available at:
`https://your-vercel-url.vercel.app/dashboard`

---

## Local Development

### Run Frontend
```bash
npm run dev
```

### Run Backend (separate terminal)
```bash
npm run server
```

### Access
- Frontend: http://localhost:5173
- Dashboard: http://localhost:5173/dashboard
- API: http://localhost:3001/api

---

## Railway Free Tier Limits
- 500 hours/month execution time
- $5 free credits/month
- Sleeps after 30 min inactivity (wakes on request)

This is sufficient for a small dashboard that's used periodically.
