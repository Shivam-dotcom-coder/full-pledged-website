// ==========================================
// FIREBASE CONFIGURATION - Gajipur Wala Naina Panda
// ==========================================
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log('Loading Firebase config...');

const firebaseConfig = {
    apiKey: "AIzaSyDqRu4hHYp24r6tTmjp7Uf901J7VQmSH4Y",
    authDomain: "gajipur-wala-naina-panda-fd1d7.firebaseapp.com",
    projectId: "gajipur-wala-naina-panda-fd1d7",
    storageBucket: "gajipur-wala-naina-panda-fd1d7.firebasestorage.app",
    messagingSenderId: "865272370390",
    appId: "1:865272370390:web:16f0cd557aa2977072a577",
    measurementId: "G-JEFB2TXY0R"
};

// Wait for Firebase SDK to load, then initialize
function initializeFirebase() {
    console.log('Attempting to initialize Firebase...');
    
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK not loaded, retrying in 100ms...');
        setTimeout(initializeFirebase, 100);
        return;
    }
    
    try {
        // Check if already initialized
        if (!firebase.apps || firebase.apps.length === 0) {
            console.log('Initializing Firebase with config:', firebaseConfig.projectId);
            firebase.initializeApp(firebaseConfig);
            console.log('✅ Firebase app initialized');
        } else {
            console.log('✅ Firebase app already initialized');
        }
        
        // Set up auth
        window.firebaseAuth = firebase.auth();
        window.firebaseAuth.languageCode = 'en';
        
        // Set flag that Firebase is ready
        window.firebaseReady = true;
        console.log('✅ Firebase Auth ready for use');
        console.log('Auth instance:', window.firebaseAuth);
        
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
        window.firebaseReady = false;
    }
}

// Start initialization immediately
initializeFirebase();
