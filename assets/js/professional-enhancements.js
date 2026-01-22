// Professional JavaScript Enhancements for SK Physio Care

// Cookie Notification System
class CookieNotification {
    constructor() {
        this.cookieName = 'skphysiocare_cookies_accepted';
        this.notification = null;
        this.scrollTimer = null;
        this.init();
    }

    init() {
        this.createNotification();
        this.setupEventListeners();
        
        // Show notification if not previously accepted
        if (!this.getCookie(this.cookieName)) {
            setTimeout(() => this.show(), 1000);
        }
    }

    createNotification() {
        const notificationHTML = `
            <div class="cookie-notification" id="cookieNotification">
                <div class="cookie-content">
                    <div class="cookie-icon"></div>
                    <p class="cookie-text">
                        This website uses cookies to improve your experience and provide personalized services. 
                        By continuing to use this site, you agree to our use of cookies. 
                        <a href="privacy-policy.html">Learn more</a>
                    </p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieNotification.accept()">Accept</button>
                    <button class="cookie-btn cookie-btn-decline" onclick="cookieNotification.decline()">Decline</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', notificationHTML);
        this.notification = document.getElementById('cookieNotification');
    }

    setupEventListeners() {
        // Hide on scroll after 10 seconds
        let scrollStarted = false;
        
        window.addEventListener('scroll', () => {
            if (!scrollStarted && this.notification.classList.contains('show')) {
                scrollStarted = true;
                this.scrollTimer = setTimeout(() => {
                    this.hide();
                    scrollStarted = false;
                }, 10000);
            }
        });
    }

    show() {
        if (this.notification) {
            this.notification.classList.add('show');
        }
    }

    hide() {
        if (this.notification) {
            this.notification.classList.remove('show');
            setTimeout(() => {
                this.notification.classList.add('hide');
            }, 300);
        }
    }

    accept() {
        this.setCookie(this.cookieName, 'accepted', 365);
        this.hide();
        this.trackEvent('cookie_accepted');
    }

    decline() {
        this.setCookie(this.cookieName, 'declined', 7);
        this.hide();
        this.trackEvent('cookie_declined');
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    trackEvent(action) {
        // Google Analytics event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'user_interaction',
                'event_label': 'cookie_consent'
            });
        }
    }
}

// Professional Loading States
class LoadingManager {
    constructor() {
        this.loadingOverlay = null;
        this.init();
    }

    init() {
        this.createLoadingOverlay();
        this.setupPageLoadAnimation();
    }

    createLoadingOverlay() {
        const loadingHTML = `
            <div class="loading-overlay" id="loadingOverlay">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading professional content...</div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    show(customText = 'Loading...') {
        if (this.loadingOverlay) {
            const textElement = this.loadingOverlay.querySelector('.loading-text');
            if (textElement) {
                textElement.textContent = customText;
            }
            this.loadingOverlay.classList.add('active');
        }
    }

    hide() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('active');
        }
    }

    setupPageLoadAnimation() {
        // Show loading on page navigation
        window.addEventListener('beforeunload', () => {
            this.show('Preparing your experience...');
        });

        // Hide loading when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), 500);
        });

        // Show loading for form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM') {
                this.show('Processing your request...');
                setTimeout(() => this.hide(), 2000);
            }
        });
    }
}

// Google Reviews Integration
class GoogleReviewsManager {
    constructor() {
        this.apiKey = 'YOUR_GOOGLE_PLACES_API_KEY'; // You'll need to add this
        this.placeId = 'ChIJd_7Q0B9ZlR4R3t9I-3sA9A'; // Example place ID
        this.reviews = [];
        this.init();
    }

    init() {
        this.loadReviews();
        this.setupReviewSubmission();
    }

    async loadReviews() {
        try {
            // For demo purposes, using mock data. Replace with actual Google Places API
            this.reviews = this.getMockReviews();
            this.renderReviews();
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.renderFallbackReviews();
        }
    }

    getMockReviews() {
        return [
            {
                author_name: "Sarah Johnson",
                rating: 5,
                relative_time_description: "2 weeks ago",
                text: "Excellent physiotherapy service! Shuaib is very professional and knowledgeable. Helped me recover from my back injury much faster than expected.",
                profile_photo_url: ""
            },
            {
                author_name: "Michael Chen",
                rating: 5,
                relative_time_description: "1 month ago",
                text: "Best physiotherapist in Ladysmith! The treatment methods are modern and effective. The clinic is clean and well-equipped.",
                profile_photo_url: ""
            },
            {
                author_name: "Emma Wilson",
                rating: 5,
                relative_time_description: "3 weeks ago",
                text: "Shuaib Khan is amazing! He really takes time to understand your condition and provides personalized treatment. Highly recommend!",
                profile_photo_url: ""
            }
        ];
    }

    renderReviews() {
        const reviewsGrid = document.querySelector('.reviews-grid');
        if (!reviewsGrid) return;

        reviewsGrid.innerHTML = this.reviews.map(review => `
            <div class="review-card" data-aos="fade-up">
                <div class="review-header">
                    <div class="reviewer-avatar">${review.author_name.charAt(0)}</div>
                    <div class="reviewer-info">
                        <h4>${review.author_name}</h4>
                        <div class="review-date">${review.relative_time_description}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${this.renderStars(review.rating)}
                </div>
                <div class="review-text">${review.text}</div>
                <div class="review-source">
                    <svg class="google-logo" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google Review</span>
                </div>
            </div>
        `).join('');
    }

    renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<i class="fas fa-star star ${i <= rating ? '' : 'empty'}"></i>`;
        }
        return stars;
    }

    renderFallbackReviews() {
        // Fallback if API fails
        const reviewsGrid = document.querySelector('.reviews-grid');
        if (reviewsGrid) {
            reviewsGrid.innerHTML = '<p>Unable to load reviews at this time. Please check our Google Business page for the latest reviews.</p>';
        }
    }

    setupReviewSubmission() {
        const writeReviewBtn = document.querySelector('.write-review-btn');
        if (writeReviewBtn) {
            writeReviewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('https://search.google.com/local/writereview?placeid=ChIJd_7Q0B9ZlR4R3t9I-3sA9A', '_blank');
            });
        }

        const viewAllBtn = document.querySelector('.view-all-reviews-btn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('https://www.google.com/search?q=shuaib+khan+physiotherapist+ladysmith', '_blank');
            });
        }
    }
}

// Blog Management System
class BlogManager {
    constructor() {
        this.posts = [];
        this.init();
    }

    init() {
        this.loadBlogPosts();
        this.setupBlogFilters();
    }

    loadBlogPosts() {
        // Mock blog posts - replace with actual blog system
        this.posts = [
            {
                id: 1,
                title: "5 Essential Exercises for Lower Back Pain Relief",
                excerpt: "Discover evidence-based exercises that can help alleviate chronic lower back pain and improve your quality of life.",
                category: "Exercise Tips",
                author: "Shuaib Khan",
                date: "2024-01-15",
                image: "blog-back-pain.jpg",
                readTime: "5 min read"
            },
            {
                id: 2,
                title: "The Science Behind Dry Needling Therapy",
                excerpt: "Learn how dry needling works to release muscle tension and promote healing in this comprehensive guide.",
                category: "Treatment Methods",
                author: "Shuaib Khan",
                date: "2024-01-10",
                image: "blog-dry-needling.jpg",
                readTime: "7 min read"
            },
            {
                id: 3,
                title: "Preventing Sports Injuries: A Physiotherapist's Guide",
                excerpt: "Professional tips on injury prevention for athletes and fitness enthusiasts of all levels.",
                category: "Sports Medicine",
                author: "Shuaib Khan",
                date: "2024-01-05",
                image: "blog-sports-injury.jpg",
                readTime: "6 min read"
            }
        ];

        this.renderBlogPosts();
    }

    renderBlogPosts() {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;

        blogGrid.innerHTML = this.posts.map(post => `
            <article class="blog-card" data-aos="fade-up">
                <img src="assets/img/${post.image}" alt="${post.title}" class="blog-image">
                <div class="blog-content">
                    <span class="blog-category">${post.category}</span>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <div class="blog-author">
                            <img src="assets/img/shuaib-khan-avatar.jpg" alt="${post.author}">
                            <span>${post.author}</span>
                        </div>
                        <span>${post.readTime}</span>
                    </div>
                    <a href="blog-post.html?id=${post.id}" class="blog-read-more">Read More →</a>
                </div>
            </article>
        `).join('');
    }

    setupBlogFilters() {
        const filterButtons = document.querySelectorAll('.blog-filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterPosts(category);
            });
        });
    }

    filterPosts(category) {
        const filteredPosts = category === 'all' 
            ? this.posts 
            : this.posts.filter(post => post.category === category);
        
        this.posts = filteredPosts;
        this.renderBlogPosts();
    }
}

// Emergency Information Manager
class EmergencyManager {
    constructor() {
        this.emergencyContacts = {
            hospital: {
                name: "Laverna Private Hospital",
                phone: "+2736314000",
                address: "1 Hospital Road, Ladysmith, 3370",
                emergency: "10177"
            },
            ambulance: {
                phone: "10177",
                description: "Emergency Medical Services"
            },
            police: {
                phone: "10111",
                description: "Police Emergency"
            }
        };
        
        this.init();
    }

    init() {
        this.setupEmergencyActions();
        this.addEmergencyShortcuts();
    }

    setupEmergencyActions() {
        const emergencyBtns = document.querySelectorAll('.emergency-btn');
        emergencyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                this.handleEmergencyAction(action);
            });
        });
    }

    handleEmergencyAction(action) {
        switch(action) {
            case 'call-hospital':
                window.location.href = `tel:${this.emergencyContacts.hospital.phone}`;
                break;
            case 'call-ambulance':
                window.location.href = `tel:${this.emergencyContacts.ambulance.phone}`;
                break;
            case 'call-police':
                window.location.href = `tel:${this.emergencyContacts.police.phone}`;
                break;
            case 'show-location':
                this.showHospitalLocation();
                break;
        }
    }

    showHospitalLocation() {
        const { name, address } = this.emergencyContacts.hospital;
        const encodedAddress = encodeURIComponent(`${name}, ${address}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }

    addEmergencyShortcuts() {
        // Add keyboard shortcuts for emergency
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + E for emergency
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
                e.preventDefault();
                this.showEmergencyModal();
            }
        });
    }

    showEmergencyModal() {
        const modalHTML = `
            <div class="emergency-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div class="emergency-modal-content" style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; text-align: center;">
                    <h2 style="color: #dc3545; margin-bottom: 20px;">Emergency Contacts</h2>
                    <div style="text-align: left; margin-bottom: 20px;">
                        <p><strong>Laverna Private Hospital:</strong> ${this.emergencyContacts.hospital.phone}</p>
                        <p><strong>Ambulance:</strong> ${this.emergencyContacts.ambulance.phone}</p>
                        <p><strong>Police:</strong> ${this.emergencyContacts.police.phone}</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Initialize all professional enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    window.cookieNotification = new CookieNotification();
    window.loadingManager = new LoadingManager();
    window.googleReviews = new GoogleReviewsManager();
    window.blogManager = new BlogManager();
    window.emergencyManager = new EmergencyManager();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log page load performance
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});
