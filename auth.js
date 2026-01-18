// Authentication System - localStorage based
class AuthSystem {
    constructor() {
        this.storageKey = 'pujaAppUsers';
        this.currentUserKey = 'currentUser';
        this.initializeStorage();
        this.updateAuthNav();
    }

    // Initialize storage with demo user
    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const demoUsers = {
                'demo@example.com': {
                    id: '1',
                    name: 'Demo User',
                    email: 'demo@example.com',
                    password: 'demo123', // In production, use hashing
                    phone: '9999999999',
                    bookings: []
                }
            };
            localStorage.setItem(this.storageKey, JSON.stringify(demoUsers));
        }
    }

    // Google OAuth Login
    googleLogin(profile) {
        const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const email = profile.email;
        
        // If user exists, log them in
        if (users[email]) {
            const user = users[email];
            localStorage.setItem(this.currentUserKey, JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                loginMethod: 'google'
            }));
            this.updateAuthNav();
            return { success: true, message: 'Logged in with Google!' };
        }
        
        // Create new user from Google profile
        users[email] = {
            id: profile.sub || Date.now().toString(),
            name: profile.name,
            email: email,
            password: 'oauth-google', // Placeholder - no password needed for OAuth
            phone: profile.phone_number || '',
            bookings: [],
            registeredDate: new Date().toLocaleDateString(),
            loginMethod: 'google',
            profilePicture: profile.picture || ''
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(users));
        localStorage.setItem(this.currentUserKey, JSON.stringify({
            id: users[email].id,
            name: users[email].name,
            email: users[email].email,
            phone: users[email].phone,
            loginMethod: 'google',
            profilePicture: users[email].profilePicture
        }));
        
        this.updateAuthNav();
        return { success: true, message: 'Account created and logged in with Google!' };
    }

    // Register new user
    register(name, email, password, phone) {
        const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        
        if (users[email]) {
            return { success: false, message: 'Email already registered' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        users[email] = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password, // In production, hash this
            phone: phone,
            bookings: [],
            registeredDate: new Date().toLocaleDateString()
        };

        localStorage.setItem(this.storageKey, JSON.stringify(users));
        return { success: true, message: 'Registration successful! Please login.' };
    }

    // Login user
    login(email, password) {
        const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const user = users[email];

        if (!user || user.password !== password) {
            return { success: false, message: 'Invalid email or password' };
        }

        localStorage.setItem(this.currentUserKey, JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }));

        return { success: true, message: 'Login successful!' };
    }

    // Logout user
    logout() {
        localStorage.removeItem(this.currentUserKey);
        window.location.href = 'index.html';
    }

    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem(this.currentUserKey);
        return user ? JSON.parse(user) : null;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Save booking
    saveBooking(bookingData) {
        const user = this.getCurrentUser();
        if (!user) {
            return { success: false, message: 'Please login to book puja' };
        }

        const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const booking = {
            id: Date.now().toString(),
            ...bookingData,
            bookingDate: new Date().toLocaleDateString(),
            status: 'Pending'
        };

        if (!users[user.email].bookings) {
            users[user.email].bookings = [];
        }

        users[user.email].bookings.push(booking);
        localStorage.setItem(this.storageKey, JSON.stringify(users));

        // Also send email notification
        sendBookingEmail(bookingData);

        return { success: true, message: 'Booking created successfully!', bookingId: booking.id };
    }

    // Get user bookings
    getUserBookings() {
        const user = this.getCurrentUser();
        if (!user) return [];

        const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        return users[user.email]?.bookings || [];
    }

    // Update user profile
    updateProfile(name, phone) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Not logged in' };

        const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        users[user.email].name = name;
        users[user.email].phone = phone;

        localStorage.setItem(this.storageKey, JSON.stringify(users));

        // Update current user
        user.name = name;
        user.phone = phone;
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));

        return { success: true, message: 'Profile updated successfully' };
    }

    // Change password
    changePassword(oldPassword, newPassword) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Not logged in' };

        const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const userData = users[user.email];

        if (userData.password !== oldPassword) {
            return { success: false, message: 'Current password is incorrect' };
        }

        if (newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters' };
        }

        userData.password = newPassword;
        localStorage.setItem(this.storageKey, JSON.stringify(users));

        return { success: true, message: 'Password changed successfully' };
    }

    // Update auth navigation
    updateAuthNav() {
        const authNav = document.getElementById('authNav');
        if (authNav) {
            if (this.isLoggedIn()) {
                const user = this.getCurrentUser();
                const avatarUrl = user.profilePicture || (`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ff6b35&color=fff&size=64`);
authNav.innerHTML = `
    <div class="user-menu">
        <img src="${avatarUrl}" class="nav-avatar" alt="${user.name}">
        <span class="user-name">${user.name}</span>
        <div class="dropdown-menu">
            <a href="dashboard.html" class="dropdown-link">Dashboard</a>
            <a href="profile.html" class="dropdown-link">Profile</a>
            <a href="javascript:auth.logout()" class="dropdown-link">Logout</a>
        </div>
    </div>
`;
                authNav.innerHTML = `
                    <div class="user-menu">
                        <span class="user-name">${user.name}</span>
                        <div class="dropdown-menu">
                            <a href="dashboard.html" class="dropdown-link">Dashboard</a>
                            <a href="profile.html" class="dropdown-link">Profile</a>
                            <a href="javascript:auth.logout()" class="dropdown-link">Logout</a>
                        </div>
                    </div>
                `;
            } else {
                authNav.innerHTML = '<a href="login.html" class="nav-link auth-link">Login</a>';
            }
        }
    }

    // Redirect to login if not authenticated
    requireLogin() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
        }
    }
}

// Initialize auth system globally
const auth = new AuthSystem();

// Demo credentials
console.log('Demo Login Credentials:');
console.log('Email: demo@example.com');
console.log('Password: demo123');

// Send email function
function sendBookingEmail(formData) {
    // This uses FormSubmit or falls back to email client
    const emailContent = `
        PUJA BOOKING APPOINTMENT
        ========================
        
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Address: ${formData.address}
        
        Puja Type: ${formData.pujaType}
        Preferred Date: ${formData.date}
        Preferred Time: ${formData.time}
        Number of Participants: ${formData.participants}
        
        Additional Details:
        ${formData.message}
        
        ========================
        This is an automated booking request. Please confirm the appointment with the customer.
    `;

    // Try FormSubmit (you need to configure this with your form ID)
    fetch('https://formspree.io/f/meeeepbv', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .catch(error => {
        // Fallback to mailto
        const recipientEmail = 'stxaviers234@gmail.com';
        const subject = encodeURIComponent('Puja Booking - Gajipur Wala Naina Panda');
        const body = encodeURIComponent(emailContent + `\n\nReply to: ${formData.email}`);
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    });
}

// Notification function
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification-styles', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                font-weight: bold;
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                max-width: 300px;
                word-wrap: break-word;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .notification-success {
                background-color: #4caf50;
                color: white;
            }
            
            .notification-error {
                background-color: #f44336;
                color: white;
            }
            
            .notification-info {
                background-color: #2196F3;
                color: white;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

