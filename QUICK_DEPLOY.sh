#!/bin/bash
# Quick Deploy Script - Choose your platform

echo "======================================"
echo "Firebase Puja Booking App - Quick Deploy"
echo "======================================"
echo ""
echo "Choose your deployment platform:"
echo ""
echo "1) GitHub Pages (Fastest - 2 min)"
echo "2) Firebase Hosting (Recommended)"
echo "3) Netlify (Auto-deploy)"
echo "4) Vercel (Auto-deploy)"
echo "5) View full guide"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 GitHub Pages Deployment"
        echo "=================================="
        echo ""
        echo "Step 1: Create GitHub repo"
        echo "  - Go to github.com"
        echo "  - Click + → New repository"
        echo "  - Name: puja-booking-app"
        echo "  - Set to PUBLIC"
        echo "  - Click Create (don't init README)"
        echo ""
        echo "Step 2: Copy these commands:"
        echo "  git init"
        echo "  git add ."
        echo "  git commit -m 'Initial commit'"
        echo "  git remote add origin https://github.com/YOUR_USERNAME/puja-booking-app.git"
        echo "  git branch -M main"
        echo "  git push -u origin main"
        echo ""
        echo "Step 3: Enable Pages"
        echo "  - Settings → Pages"
        echo "  - Source: Deploy from branch"
        echo "  - Branch: main, Folder: /"
        echo "  - Save"
        echo ""
        echo "✅ Your site: https://YOUR_USERNAME.github.io/puja-booking-app"
        ;;
    
    2)
        echo ""
        echo "🚀 Firebase Hosting Deployment"
        echo "=================================="
        echo ""
        echo "Step 1: Install Firebase CLI"
        echo "  npm install -g firebase-tools"
        echo ""
        echo "Step 2: Login"
        echo "  firebase login"
        echo ""
        echo "Step 3: Deploy"
        echo "  firebase init hosting"
        echo "  - Select project"
        echo "  - Public dir: ."
        echo "  - Single page app: Yes"
        echo ""
        echo "  firebase deploy"
        echo ""
        echo "✅ Your site: https://your-project.web.app"
        ;;
    
    3)
        echo ""
        echo "🚀 Netlify Deployment"
        echo "=================================="
        echo ""
        echo "Step 1: Push to GitHub"
        echo "  git init && git add . && git commit -m 'Initial'"
        echo "  git remote add origin <your-github-repo>"
        echo "  git push -u origin main"
        echo ""
        echo "Step 2: Connect to Netlify"
        echo "  - Go to netlify.com"
        echo "  - Sign in with GitHub"
        echo "  - New site from Git"
        echo "  - Select puja-booking-app"
        echo "  - Deploy"
        echo ""
        echo "✅ Auto-deploys on every push!"
        ;;
    
    4)
        echo ""
        echo "🚀 Vercel Deployment"
        echo "=================================="
        echo ""
        echo "Step 1: Push to GitHub"
        echo "  git init && git add . && git commit -m 'Initial'"
        echo "  git remote add origin <your-github-repo>"
        echo "  git push -u origin main"
        echo ""
        echo "Step 2: Import to Vercel"
        echo "  - Go to vercel.com"
        echo "  - Import Git Repository"
        echo "  - Select puja-booking-app"
        echo "  - Deploy"
        echo ""
        echo "✅ Auto-deploys on every push!"
        ;;
    
    5)
        echo ""
        echo "📖 Opening full deployment guide..."
        echo ""
        if command -v start &> /dev/null; then
            start DEPLOYMENT_GUIDE.md
        elif command -v xdg-open &> /dev/null; then
            xdg-open DEPLOYMENT_GUIDE.md
        else
            cat DEPLOYMENT_GUIDE.md | less
        fi
        ;;
    
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed help, see:"
echo "  - DEPLOYMENT_GUIDE.md"
echo "  - GITHUB_DEPLOYMENT.md"
echo "  - README.md"
echo ""
echo "Happy deploying! 🎉"
