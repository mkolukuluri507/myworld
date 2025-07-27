# Quick Deployment Steps

## 1. Railway Backend Deployment
1. Go to https://railway.app
2. Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select "mkolukuluri507/myworld"
5. Click "Deploy Now"

## 2. Add Environment Variables in Railway
Go to Variables tab and add:
```
MONGO_URL = mongodb+srv://username:password@cluster.mongodb.net/portfolio_db
DB_NAME = portfolio_db
```

## 3. Get Railway URL
- Copy your Railway app URL (e.g., https://myworld-production-xxxx.up.railway.app)

## 4. Vercel Frontend Deployment
1. Go to https://vercel.com
2. Login with GitHub
3. Click "Import Project"
4. Select "mkolukuluri507/myworld"
5. Set Root Directory: `frontend`
6. Add Environment Variable:
   - Name: `REACT_APP_BACKEND_URL`
   - Value: Your Railway URL from step 3
7. Click "Deploy"

## Done!
Your app will be live at:
- Frontend: https://your-app.vercel.app
- Backend: https://your-railway-url.railway.app