// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-container')) {
        if (navMenu) navMenu.classList.remove('active');
    }
});

// Booking Form Handler (for book-puja.html)
if (document.getElementById('bookingForm')) {
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get user data if logged in, otherwise use form email
        const user = auth.getCurrentUser();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value || (user ? user.email : ''),
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            pujaType: document.getElementById('pujaType').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            participants: document.getElementById('participants').value,
            message: document.getElementById('message').value,
            bookingType: user ? 'registered' : 'guest'  // Track if guest or registered user
        };

        const result = auth.saveBooking(formData);
        
        if (result.success) {
            showNotification('success', result.message);
            document.getElementById('bookingForm').reset();
            setTimeout(() => {
                if (user) {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'index.html';  // Redirect to home for guests
                }
            }, 2000);
        } else {
            showNotification('error', result.message);
        }
    });
}

// Contact Form Handler
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value
        };

        sendBookingEmail(formData);
        
        showNotification('success', 'Message sent successfully!');
        document.getElementById('contactForm').reset();
    });
}

// Set minimum date to today
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Phone input validation
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9+\-\s]/g, '');
    });
});

// Number input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', function(e) {
        if (this.min && parseInt(this.value) < parseInt(this.min)) {
            this.value = this.min;
        }
    });
});

console.log('Website loaded successfully');
