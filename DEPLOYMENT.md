# Deployment Guide

## Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: MongoDB Atlas

---

## 1. Deploy Backend on Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `spices-spouses-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`

### Step 3: Add Environment Variables
In Render dashboard, add these environment variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://gleam_admin:Crazie13@gleam.991xcdg.mongodb.net/gleam?retryWrites=true&w=majority&appName=andrewmanyika` |
| `FRONTEND_URL` | Your Vercel URL (e.g., `https://your-app.vercel.app`) |
| `NODE_ENV` | `production` |

### Step 4: Deploy
Render will automatically deploy. Your API will be at:
`https://spices-spouses-api.onrender.com`

---

## 2. Deploy Frontend on Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project
1. Click "Add New Project"
2. Import this repository from GitHub
3. Vercel will auto-detect the Vite framework

### Step 3: Add Environment Variable
Add this in Vercel project settings:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://spices-spouses-api.onrender.com/api`) |

### Step 4: Deploy
Click "Deploy" and your site will be live!

---

## Post-Deployment

### Update CORS
After getting your Vercel URL, go back to Render and update the `FRONTEND_URL` environment variable.

### Access Your Site
- Landing Page: `https://your-app.vercel.app`
- Dashboard: `https://your-app.vercel.app/dashboard`

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

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stats` | GET | Get ticket statistics |
| `/api/tickets` | GET | Get all tickets |
| `/api/tickets` | POST | Create new ticket sale |
| `/api/tickets/:id/cancel` | PATCH | Cancel a ticket |
| `/api/tickets/:id/restore` | PATCH | Restore cancelled ticket |
| `/api/tickets/:id` | DELETE | Delete ticket permanently |

---

## Render Free Tier Notes
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Sufficient for small dashboard usage
