// Firebase Google Login - Production Ready
// Only Firebase, No Demo/Mock Login

document.addEventListener('DOMContentLoaded', function() {
    console.log('login.js loaded');
    console.log('Firebase ready:', window.firebaseReady);
    console.log('Firebase auth:', window.firebaseAuth);
    
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', handleGoogleLogin);
    }
    
    // Check if already logged in
    restoreUserSession();
    
    // If a redirect sign-in occurred, handle the result
    if (window.firebaseAuth && typeof window.firebaseAuth.getRedirectResult === 'function') {
        window.firebaseAuth.getRedirectResult()
            .then((result) => {
                if (result && result.user) {
                    console.log('✅ Redirect sign-in result received');
                    handleSignedInUser(result.user);
                }
            })
            .catch((error) => {
                console.error('Redirect sign-in error:', error.code, error.message);
                // If popup was blocked and redirect also failed, inform user
                if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                    showErrorNotification('Sign-in must be completed in the popup or allow popups for this site.');
                }
            });
    }
});

function restoreUserSession() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            if (user && user.email) {
                console.log('User already logged in, redirecting to dashboard...');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            }
        } catch (e) {
            console.error('Invalid session data');
            localStorage.removeItem('currentUser');
        }
    }
}

function handleGoogleLogin() {
    console.log('Google login button clicked');
    
    const btn = document.getElementById('googleLoginBtn');
    const loadingDiv = document.querySelector('.loading');
    
    btn.disabled = true;
    if (loadingDiv) loadingDiv.classList.add('show');
    
    // Check Firebase is ready
    if (!window.firebaseReady || !window.firebaseAuth) {
        console.error('Firebase not ready');
        alert('Firebase is not initialized. Please refresh the page.');
        resetButton(btn, loadingDiv);
        return;
    }
    
    loginWithFirebase(btn, loadingDiv);
}

// Firebase Google Sign-In
function loginWithFirebase(btn, loadingDiv) {
    try {
        const auth = window.firebaseAuth;
        const provider = new firebase.auth.GoogleAuthProvider();
        
        console.log('Opening Google Sign-In popup...');
        
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log('✅ Successfully signed in with Google');
                const user = result.user;
                handleSignedInUser(user);
            })
            .catch((error) => {
                console.error('Google sign-in error:', error.code, error.message);

                // If popup was blocked by browser, fall back to redirect sign-in
                if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                    console.warn('Popup was blocked — falling back to redirect sign-in');
                    showErrorNotification('Popup blocked. Redirecting to complete sign-in...');
                    // Use redirect as a fallback
                    auth.signInWithRedirect(provider);
                    return;
                }

                // Handle specific errors
                if (error.code === 'auth/popup-closed-by-user') {
                    console.log('User closed the popup');
                    showErrorNotification('Sign-in cancelled');
                } else if (error.code === 'auth/operation-not-supported-in-this-environment') {
                    console.error('Popup not supported in this environment');
                    showErrorNotification('Please use a modern browser');
                } else {
                    showErrorNotification('Sign-in failed: ' + error.message);
                }

                resetButton(btn, loadingDiv);
            });
    } catch (error) {
        console.error('Error opening Google popup:', error);
        showErrorNotification('Error: ' + error.message);
        resetButton(btn, loadingDiv);
    }
}

// Process a Firebase user object after successful sign-in (popup or redirect)
function handleSignedInUser(user) {
    try {
        const userData = {
            id: user.uid,
            name: user.displayName || (user.email ? user.email.split('@')[0] : 'User'),
            email: user.email || '',
            phone: user.phoneNumber || '',
            loginMethod: 'google',
            profilePicture: user.photoURL || '',
            loginTime: new Date().toISOString()
        };

        // Save user to database and current session
        saveUserToDatabase(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));

        showSuccessNotification('Logged in successfully!');
        console.log('User processed after sign-in:', userData.email);

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
    } catch (e) {
        console.error('Error processing signed-in user:', e);
        showErrorNotification('Unable to complete sign-in.');
    }
}

function saveUserToDatabase(userData) {
    try {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('pujaAppUsers') || '{}');
        
        // Add new user
        users[userData.email] = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '',
            loginMethod: 'google',
            profilePicture: userData.profilePicture || '',
            registeredDate: new Date().toLocaleDateString(),
            bookings: [],
            loginTime: userData.loginTime
        };
        
        // Save to storage
        localStorage.setItem('pujaAppUsers', JSON.stringify(users));
        console.log('User saved to database');
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

function resetButton(btn, loadingDiv) {
    if (btn) btn.disabled = false;
    if (loadingDiv) loadingDiv.classList.remove('show');
}

function showSuccessNotification(message) {
    if (typeof showNotification !== 'undefined') {
        showNotification('success', message);
    } else {
        console.log('✅ ' + message);
    }
}

function showErrorNotification(message) {
    if (typeof showNotification !== 'undefined') {
        showNotification('error', message);
    } else {
        console.error('❌ ' + message);
    }
}

// End of login.js
