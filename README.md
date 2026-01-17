# Gajipur Wala Naina Panda - Puja Booking System

A modern puja booking application built with Firebase Authentication and Google Login integration.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Firebase](https://img.shields.io/badge/Firebase-10.7.0-orange)

## 📋 Features

- **Google Authentication**: Sign in with Google using Firebase
- **User Dashboard**: Manage your bookings and profile
- **Puja Booking System**: Book pujas with email confirmation
- **Guest Checkout**: Book without creating an account
- **Responsive Design**: Works on all devices
- **Local Storage**: Client-side data persistence
- **Demo Mode**: Test with mock accounts

## 🚀 Quick Start

### Prerequisites
- Modern web browser with JavaScript enabled
- No backend server required (static website)
- Optional: Firebase project for real authentication

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/puja-booking-app.git
cd puja-booking-app
```

2. **Open in browser**
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🔐 Authentication Setup

### Option 1: Firebase Authentication (Recommended)

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Create Project"
   - Enable Google Authentication in Authentication settings

2. **Update Configuration** ✅ DONE
   - Your Firebase credentials have been configured in `firebase-config.js`
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDqRu4hHYp24r6tTmjp7Uf901J7VQmSH4Y",
    authDomain: "gajipur-wala-naina-panda-fd1d7.firebaseapp.com",
    projectId: "gajipur-wala-naina-panda-fd1d7",
    storageBucket: "gajipur-wala-naina-panda-fd1d7.firebasestorage.app",
    messagingSenderId: "865272370390",
    appId: "1:865272370390:web:16f0cd557aa2977072a577"
};
```

3. **Configure Google OAuth Consent Screen**
   - In Firebase Console → Authentication → Google → Edit
   - Add your website URL to authorized domains
   - Configure OAuth consent screen

### Option 2: Demo Mode (Works Out of the Box)

The app comes with mock Google login that requires no setup:
- Email: `google@example.com`
- Email: `test@gmail.com`
- Demo account: `demo@example.com` / `demo123`

## 📁 Project Structure

```
puja-booking-app/
├── index.html              # Home page
├── login.html              # Login page with Google button
├── register.html           # User registration
├── dashboard.html          # User dashboard
├── book-puja.html          # Puja booking form
├── about.html              # About page
├── services.html           # Services page
├── contact.html            # Contact page
├── location.html           # Location page
├── styles.css              # Main styles
├── login-styles.css        # Login page styles
├── auth.js                 # Authentication system
├── firebase-config.js      # Firebase configuration
├── login.js                # Google login handler
├── script.js               # Main application logic
└── .gitignore              # Git ignore file
```

## 📱 Pages Overview

### 1. **Home (index.html)**
- Landing page with navigation
- Quick access to booking and login

### 2. **Login (login.html)**
- Google Sign-In button
- Demo account option
- Registration link

### 3. **Dashboard (dashboard.html)**
- User profile information
- Booking history
- Quick booking access
- Logout button

### 4. **Book Puja (book-puja.html)**
- Puja selection form
- Date and time picker
- Guest/User checkout
- Email confirmation

### 5. **Other Pages**
- About, Services, Contact, Location pages
- Navigation available on all pages

## 🔧 Configuration

### Firebase Config (`firebase-config.js`) ✅ CONFIGURED

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDqRu4hHYp24r6tTmjp7Uf901J7VQmSH4Y",
    authDomain: "gajipur-wala-naina-panda-fd1d7.firebaseapp.com",
    projectId: "gajipur-wala-naina-panda-fd1d7",
    storageBucket: "gajipur-wala-naina-panda-fd1d7.firebasestorage.app",
    messagingSenderId: "865272370390",
    appId: "1:865272370390:web:16f0cd557aa2977072a577"
};
```

### User Data Structure (`auth.js`)

Users are stored in localStorage with the following structure:
```json
{
    "user@example.com": {
        "id": "unique_id",
        "name": "User Name",
        "email": "user@example.com",
        "phone": "9876543210",
        "bookings": [],
        "registeredDate": "1/17/2026",
        "loginMethod": "google"
    }
}
```

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/root` folder
   - Save

3. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/puja-booking-app`

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase Hosting**
```bash
firebase init hosting
```

4. **Deploy**
```bash
firebase deploy
```

### Deploy to Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build**
   - Build command: (leave empty)
   - Publish directory: `.` (root)

3. **Deploy**
   - Netlify automatically deploys on push

### Deploy to Vercel

1. **Import Project**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Git Repository"
   - Select your GitHub repo

2. **Deploy**
   - Vercel handles the rest automatically

## 🔐 Security Best Practices

1. **Never commit credentials**
   - Use environment variables in production
   - Add `.env` to `.gitignore`

2. **Enable Firebase Security Rules**
   - Configure Firestore/Realtime Database rules
   - Restrict data access appropriately

3. **HTTPS Only**
   - All deployment platforms use HTTPS by default
   - Use HTTPS in development with `localhost`

4. **User Privacy**
   - Clear sensitive data on logout
   - Comply with GDPR/privacy regulations

## 🧪 Testing

### Test with Demo Accounts

**Mock Google Login:**
- Email: `google@example.com`
- Email: `test@gmail.com`

**Demo Account:**
- Email: `demo@example.com`
- Password: `demo123`

### Browser Console
Check browser console (F12) for authentication logs and errors.

## 🐛 Troubleshooting

### Google Login Not Working
1. Check if Firebase is initialized: Look in browser console
2. Verify Firebase credentials in `firebase-config.js`
3. Check browser console for error messages
4. Ensure JavaScript is enabled

### Data Not Persisting
1. Clear localStorage: `localStorage.clear()` in console
2. Check browser's localStorage limit (usually 5-10MB)
3. Verify no private/incognito mode

### Pages Not Loading
1. Ensure all HTML files are in the same directory
2. Check for typos in file references
3. Verify correct file paths in links

## 📞 Support

For issues or questions:
1. Check the browser console (F12) for error messages
2. Verify all files are present in the repository
3. Ensure JavaScript is enabled

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👤 Author

Gajipur Wala Naina Panda House

## 🙏 Credits

- Firebase for authentication
- Google for OAuth 2.0
- Font Awesome for icons

---

**Last Updated**: January 2026

## 📈 Version History

- **v1.0.0** - Initial release with Firebase Google Login
  - Complete puja booking system
  - User authentication
  - Responsive design
  - Local storage data persistence
