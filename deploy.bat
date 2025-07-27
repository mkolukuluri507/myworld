@echo off
echo Starting deployment process...

echo.
echo Step 1: Installing frontend dependencies...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Building frontend...
npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    pause
    exit /b 1
)

cd ..

echo.
echo Step 3: Installing backend dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Backend dependency installation failed!
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ Local build successful!
echo.
echo Next steps:
echo 1. Push your code to GitHub
echo 2. Deploy backend to Railway (see deploy.md)
echo 3. Deploy frontend to Vercel (see deploy.md)
echo 4. Update REACT_APP_BACKEND_URL in frontend/.env.production
echo.
echo See deploy.md for detailed instructions.
pause