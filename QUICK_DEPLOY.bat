@echo off
REM Firebase Puja Booking App - Quick Deploy Script for Windows

color 0A
cls
echo.
echo ======================================
echo Firebase Puja Booking App - Quick Deploy
echo ======================================
echo.
echo Choose your deployment platform:
echo.
echo 1) GitHub Pages (Fastest - 2 min)
echo 2) Firebase Hosting (Recommended)
echo 3) Netlify (Auto-deploy)
echo 4) Vercel (Auto-deploy)
echo 5) View full guide
echo 6) Start local server (http-server)
echo 7) Test Google Login
echo 8) Exit
echo.
set /p choice="Enter your choice (1-8): "

if "%choice%"=="1" goto github
if "%choice%"=="2" goto firebase
if "%choice%"=="3" goto netlify
if "%choice%"=="4" goto vercel
if "%choice%"=="5" goto guide
if "%choice%"=="6" goto server
if "%choice%"=="7" goto test
if "%choice%"=="8" goto end

echo Invalid choice. Please try again.
pause
goto start

:github
cls
echo.
echo ========================================
echo GitHub Pages Deployment
echo ========================================
echo.
echo Step 1: Create GitHub repository
echo   - Go to github.com
echo   - Click + (top right) and select "New repository"
echo   - Name: puja-booking-app
echo   - Set to PUBLIC
echo   - Click "Create repository"
echo.
echo Step 2: Copy and run these commands:
echo.
echo   git init
echo   git add .
echo   git commit -m "Initial commit: Firebase Puja Booking App"
echo   git remote add origin https://github.com/YOUR_USERNAME/puja-booking-app.git
echo   git branch -M main
echo   git push -u origin main
echo.
echo Step 3: Enable GitHub Pages
echo   - Go to repository Settings (top menu)
echo   - Click "Pages" in left sidebar
echo   - Under "Build and deployment"
echo   - Source: Deploy from a branch
echo   - Branch: main, Folder: / (root)
echo   - Click "Save"
echo.
echo ============ RESULT ============
echo Your site will be live at:
echo https://YOUR_USERNAME.github.io/puja-booking-app
echo.
echo Updates deploy automatically in 1-2 minutes!
echo.
pause
goto start

:firebase
cls
echo.
echo ========================================
echo Firebase Hosting Deployment
echo ========================================
echo.
echo Prerequisites: Node.js installed
echo.
echo Step 1: Install Firebase CLI
echo   npm install -g firebase-tools
echo.
echo Step 2: Login to Firebase
echo   firebase login
echo.
echo Step 3: Initialize Firebase
echo   firebase init hosting
echo.
echo   When prompted:
echo   - Select your Firebase project
echo   - Public directory: .
echo   - Single page app: Yes
echo   - Overwrite index.html: No
echo.
echo Step 4: Deploy
echo   firebase deploy
echo.
echo ============ RESULT ============
echo Your site will be live at:
echo https://your-project-name.web.app
echo.
echo Instant updates on every deploy!
echo.
pause
goto start

:netlify
cls
echo.
echo ========================================
echo Netlify Deployment (Auto-Deploy)
echo ========================================
echo.
echo Step 1: Push code to GitHub first
echo   (Follow GitHub Pages steps above)
echo.
echo Step 2: Connect to Netlify
echo   - Go to netlify.com
echo   - Click "Sign in with GitHub"
echo   - Authorize Netlify
echo   - Click "New site from Git"
echo   - Select your puja-booking-app repository
echo   - Click "Deploy site"
echo.
echo ============ RESULT ============
echo Your site will be live at:
echo https://your-site-name.netlify.app
echo.
echo Auto-deploys on every push to GitHub!
echo.
pause
goto start

:vercel
cls
echo.
echo ========================================
echo Vercel Deployment (Auto-Deploy)
echo ========================================
echo.
echo Step 1: Push code to GitHub first
echo   (Follow GitHub Pages steps above)
echo.
echo Step 2: Deploy to Vercel
echo   - Go to vercel.com
echo   - Click "Import Git Repository"
echo   - Connect your GitHub account
echo   - Select your puja-booking-app repository
echo   - Click "Import"
echo   - Click "Deploy"
echo.
echo ============ RESULT ============
echo Your site will be live at:
echo https://puja-booking-app.vercel.app
echo.
echo Auto-deploys on every push to GitHub!
echo.
pause
goto start

:guide
cls
echo.
echo Opening deployment guide...
echo Please wait...
echo.
timeout /t 2 /nobreak
start notepad.exe DEPLOYMENT_GUIDE.md
goto start

:server
cls
echo.
echo ========================================
echo Starting Local Test Server
echo ========================================
echo.
echo Testing with Python...
python -m http.server 8000
echo.
echo If successful, open: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
pause
goto start

:test
cls
echo.
echo ========================================
echo Testing Google Login
echo ========================================
echo.
echo 1. Start local server (if not running)
echo    python -m http.server 8000
echo.
echo 2. Open browser: http://localhost:8000/login.html
echo.
echo 3. Click "Sign in with Google"
echo.
echo 4. Use demo email:
echo    google@example.com  OR  test@gmail.com
echo.
echo 5. Check that:
echo    - Login dialog appears
echo    - User data saves to localStorage
echo    - Redirect to dashboard works
echo.
echo 6. For Firebase login:
echo    - Update firebase-config.js with your credentials
echo    - Configure Google OAuth in Firebase Console
echo    - Add authorized domains
echo.
echo 7. Check browser console (F12) for errors
echo.
pause
goto start

:end
cls
echo.
echo Thank you for using Firebase Puja Booking App!
echo.
echo Quick reminder:
echo - GitHub Pages is fastest for deployment
echo - Firebase Hosting is most powerful
echo - Netlify/Vercel auto-deploys on GitHub push
echo.
echo For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.
pause
exit /b

:start
cls
goto github
