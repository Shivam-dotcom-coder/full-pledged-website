       // Check if user is logged in
        auth.requireLogin();

        // Load user data
        const user = auth.getCurrentUser();
        document.getElementById('userName').textContent = user.name;

        // Load profile data
        function loadProfile() {
            document.getElementById('profileName').value = user.name;
            document.getElementById('profileEmail').value = user.email;
            document.getElementById('profilePhone').value = user.phone;
            
            const users = JSON.parse(localStorage.getItem(auth.storageKey) || '{}');
            const userData = users[user.email];
            if (userData.registeredDate) {
                document.getElementById('profileDate').value = userData.registeredDate;
            }
        }

        // Load bookings
        function loadBookings() {
            const bookings = auth.getUserBookings();
            const container = document.getElementById('bookingsContainer');
            
            if (bookings.length === 0) {
                container.innerHTML = '<p class="empty-state">No bookings yet. <a href="book-puja.html">Book a puja now!</a></p>';
            } else {
                container.innerHTML = bookings.map((booking, index) => `
                    <div class="booking-card">
                        <div class="booking-header">
                            <h3>Booking #${booking.id.slice(-6)}</h3>
                            <span class="booking-status ${booking.status.toLowerCase()}">${booking.status}</span>
                        </div>
                        <div class="booking-details">
                            <p><strong>Puja Type:</strong> ${booking.pujaType}</p>
                            <p><strong>Date:</strong> ${booking.date}</p>
                            <p><strong>Time:</strong> ${booking.time}</p>
                            <p><strong>Participants:</strong> ${booking.participants}</p>
                            <p><strong>Booked On:</strong> ${booking.bookingDate}</p>
                        </div>
                    </div>
                `).join('');
            }

            // Update stats
            document.getElementById('totalBookings').textContent = bookings.length;
            document.getElementById('pendingBookings').textContent = bookings.filter(b => b.status === 'Pending').length;
            document.getElementById('completedBookings').textContent = bookings.filter(b => b.status === 'Completed').length;
        }

        // Tab switching
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.classList.contains('logout-link')) return;
                e.preventDefault();
                
                const tabName = this.getAttribute('data-tab');
                if (!tabName) return;

                // Hide all tabs
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });

                // Remove active class from links
                document.querySelectorAll('.sidebar-link').forEach(l => {
                    l.classList.remove('active');
                });

                // Show selected tab
                document.getElementById(tabName).classList.add('active');
                this.classList.add('active');
            });
        });

        // Profile form submit
        document.getElementById('profileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('profileName').value;
            const phone = document.getElementById('profilePhone').value;
            
            const result = auth.updateProfile(name, phone);
            if (result.success) {
                showNotification('success', result.message);
                auth.updateAuthNav();
            } else {
                showNotification('error', result.message);
            }
        });

        // Security form submit
        document.getElementById('securityForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const oldPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirm) {
                showNotification('error', 'Passwords do not match');
                return;
            }
            
            const result = auth.changePassword(oldPassword, newPassword);
            if (result.success) {
                showNotification('success', result.message);
                document.getElementById('securityForm').reset();
            } else {
                showNotification('error', result.message);
            }
        });

        // Initial load
        loadProfile();
        loadBookings();
        auth.updateAuthNav();

        // Phone validation
        document.getElementById('profilePhone').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9+\-\s]/g, '');
        });
