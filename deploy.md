# Free Deployment Guide

## Prerequisites
1. GitHub account
2. Vercel account (free)
3. Railway account (free)
4. MongoDB Atlas account (free)

## Step 1: Setup MongoDB Atlas (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Whitelist all IPs (0.0.0.0/0) for Railway access

## Step 2: Deploy Backend to Railway
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Deploy from the root directory
4. Add environment variables:
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `DB_NAME`: portfolio_db
   - `ANTHROPIC_API_KEY`: Your Anthropic API key (if using chat)
   - `EMAIL_HOST`: Your email SMTP host
   - `EMAIL_PORT`: Your email SMTP port
   - `EMAIL_USER`: Your email username
   - `EMAIL_PASSWORD`: Your email password

## Step 3: Deploy Frontend to Vercel
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set build settings:
   - Framework: Create React App
   - Root Directory: `frontend`
   - Build Command: `yarn build`
   - Output Directory: `build`
4. Add environment variable:
   - `REACT_APP_BACKEND_URL`: Your Railway backend URL

## Step 4: Update Backend URL
After Railway deployment, update `frontend/.env.production` with your actual Railway URL.

## Commands to Deploy Locally (Optional)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy backend
railway up

# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

## Free Tier Limits
- **Railway**: 500 hours/month, 1GB RAM, 1GB storage
- **Vercel**: 100GB bandwidth, 6000 build minutes
- **MongoDB Atlas**: 512MB storage, shared cluster

Your portfolio will be live at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend-app.railway.app`