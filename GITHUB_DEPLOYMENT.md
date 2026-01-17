# GitHub Deployment Guide

## Step-by-Step Guide to Deploy Your Firebase App to GitHub Pages

### 📋 Prerequisites
- GitHub account
- Git installed on your computer
- This repository cloned locally

### 🔄 Step 1: Initialize Git Repository (If Not Done)

```bash
# Navigate to your project directory
cd /path/to/puja-booking-app

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Firebase Puja Booking App"
```

### 📤 Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Name: `puja-booking-app`
4. Description: "Puja booking system with Firebase Google Login"
5. Choose **Public** or **Private**
6. **Don't** initialize with README (we have one)
7. Click **Create repository**

### 🔗 Step 3: Connect Local Repository to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/puja-booking-app.git

# Verify remote
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 🌐 Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for GitHub to build and deploy

### ✅ Step 5: Access Your Live Site

Your app is now live at:
```
https://YOUR_USERNAME.github.io/puja-booking-app
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 🔄 Step 6: Making Updates

After making changes to your code:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Update: Description of changes"

# Push to GitHub
git push
```

GitHub Pages automatically updates within 1-2 minutes.

## 🚀 Advanced Deployment Options

### Option 1: Use Custom Domain

1. In GitHub Settings → Pages
2. Under "Custom domain", enter your domain
3. Update your domain's DNS records to point to GitHub
4. GitHub will provision an SSL certificate automatically

### Option 2: Use GitHub Actions for CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

### Option 3: Deploy to Multiple Platforms

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### Netlify
- Connect repository via [Netlify Dashboard](https://app.netlify.com)
- Auto-deploys on push

#### Vercel
- Import at [Vercel Dashboard](https://vercel.com)
- Auto-deploys on push

## 🔐 Setting Up Firebase for Production

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Name: `puja-booking-prod`
4. Enable Google Analytics (optional)

### Step 2: Enable Google Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Select **Google** as sign-in method
4. Enable it
5. Configure consent screen

### Step 3: Get Your Config
1. Go to Project Settings (gear icon)
2. Under "Your apps", click the web icon
3. Copy the configuration object
4. Paste into `firebase-config.js`

### Step 4: Configure Authorized Domains
1. In Authentication → Settings
2. Under "Authorized domains", add:
   - `localhost`
   - `127.0.0.1`
   - `YOUR_USERNAME.github.io`
   - Your custom domain (if using one)

## 🧪 Testing Your Deployment

### Test GitHub Pages URL
```bash
# Navigate to
https://YOUR_USERNAME.github.io/puja-booking-app/index.html

# Test login page
https://YOUR_USERNAME.github.io/puja-booking-app/login.html

# Test booking
https://YOUR_USERNAME.github.io/puja-booking-app/book-puja.html
```

### Test Google Login
1. Go to login page
2. Click "Sign in with Google"
3. If using demo mode: Select demo account
4. If using real Firebase: Sign with your Google account
5. Verify redirect to dashboard

### Browser Console Debugging
1. Press F12 to open Developer Tools
2. Go to **Console** tab
3. Look for "Firebase initialized successfully"
4. Check for any error messages

## ⚠️ Common Issues & Solutions

### Issue: 404 Error on GitHub Pages
**Solution**: 
- Ensure all file names match exactly (case-sensitive on GitHub)
- Check relative file paths in HTML

### Issue: Google Login Not Working
**Solution**:
- Verify Firebase config in `firebase-config.js`
- Check authorized domains in Firebase Console
- Clear browser cache and localStorage

### Issue: Styles Not Loading
**Solution**:
- Verify CSS file paths are relative
- Clear browser cache (Ctrl+Shift+Delete)
- Check for CSS errors in browser DevTools

### Issue: Data Not Persisting
**Solution**:
- Don't use private/incognito browser mode
- Check localStorage not disabled in browser
- Verify sufficient storage space (5-10MB available)

## 📊 Monitoring Your Deployment

### GitHub Stats
- Go to repository → Insights
- View traffic and clones

### Firebase Analytics (if enabled)
- Firebase Console → Analytics
- View user activity and login methods

### Browser Performance
- DevTools → Lighthouse → Analyze page load

## 🔄 Updating Your App

### Local Development
```bash
# Make changes locally
# Test in browser
# Commit changes
git add .
git commit -m "Feature: Description"
git push
```

### Remote Update
```bash
# Pull latest changes
git pull origin main

# Make new changes
# Commit and push
git add .
git commit -m "Update: Description"
git push
```

## 🛡️ Security Checklist

- [ ] Never commit `.env` files
- [ ] Keep Firebase credentials updated
- [ ] Enable HTTPS (automatic on GitHub Pages)
- [ ] Configure Firebase security rules
- [ ] Use environment variables for sensitive data
- [ ] Test authentication thoroughly
- [ ] Monitor user data and privacy compliance

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Web Best Practices](https://web.dev)

## 💡 Tips for Success

1. **Regular Commits**: Commit frequently with clear messages
2. **Test Locally First**: Always test before pushing
3. **Documentation**: Keep README updated
4. **Backups**: Keep local backups of your code
5. **Version Control**: Use meaningful commit messages

---

**Deployed Successfully!** 🎉

Your app is now live and can be accessed globally via GitHub Pages.
