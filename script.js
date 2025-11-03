// Single Page Application Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();

    // Slideshow functionality
    initSlideshow();

    // Navigation functionality
    initNavigation();

    // Progress circles animation
    initProgressCircles();

    // Other interactive elements
    initInteractiveElements();

    // Language toggle functionality
    initLanguageToggle();
});

function initApp() {
    console.log('Website initialized successfully');
}

function initSlideshow() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slideCount = slides.length;
    const prevBtn = document.querySelector('.slide-btn.prev');
    const nextBtn = document.querySelector('.slide-btn.next');

    if (slides.length === 0) return;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slideCount) % slideCount;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Manual controls
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Pause on hover
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshow.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
    }
}

function initNavigation() {
    // For multi-page website, navigation is handled by HTML links
    // Remove any SPA functionality and use regular HTML links

    // Highlight current page in navigation
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('nav-active');
        }
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
}

function initProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');

    if (progressCircles.length === 0) return;

    progressCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        let current = 0;
        const increment = percent > 100 ? 100 : 1;
        const target = parseInt(percent);
        const speed = percent > 100 ? 10 : 20;

        const timer = setInterval(() => {
            current += increment;
            const span = circle.querySelector('span');
            if (span) {
                span.textContent = percent > 100 ? current + '+' : current + '%';
            }

            // Update CSS variable for conic gradient
            circle.style.setProperty('--percent', `${Math.min(current, target)}%`);

            if (current >= target) {
                if (span) {
                    span.textContent = percent > 100 ? target + '+' : target + '%';
                }
                clearInterval(timer);
            }
        }, speed);
    });
}

function initInteractiveElements() {
    // Login functionality
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const username = prompt('ব্যবহারকারীর নাম লিখুন:');
            const password = prompt('পাসওয়ার্ড লিখুন:');

            if (username && password) {
                alert('লগিন সফল! স্বাগতম ' + username);
            }
        });
    }

    // View buttons for notices
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                const noticeItem = this.closest('.notice-item');
                const noticeTitle = noticeItem.querySelector('h4').textContent;
                alert(`দেখুন ক্লিক করা হয়েছে: ${noticeTitle}`);
            }
        });
    });

    // Read more buttons functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                const activityInfo = this.parentElement;
                const description = activityInfo.querySelector('p');

                if (this.textContent.includes('আরও পড়ুন') || this.textContent.includes('Read More')) {
                    description.style.height = 'auto';
                    this.innerHTML = this.textContent.includes('আরও পড়ুন') ?
                        '<i class="fas fa-minus"></i> সংক্ষেপ' :
                        '<i class="fas fa-minus"></i> Less';
                } else {
                    description.style.height = '4.8em';
                    this.innerHTML = this.textContent.includes('সংক্ষেপ') ?
                        '<i class="fas fa-plus"></i> আরও পড়ুন' :
                        '<i class="fas fa-plus"></i> Read More';
                }
            }
        });
    });

    // Filter buttons for gallery
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const currentLanguage = localStorage.getItem('language');

            if (currentLanguage === 'english') {
                alert(`Thank you ${name}! Your message has been sent successfully.`);
            } else {
                alert(`ধন্যবাদ ${name}! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।`);
            }
            this.reset();
        });
    }

    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (!this.classList.contains('active')) {
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function initLanguageToggle() {
    const languageBtn = document.getElementById('languageBtn');
    let isEnglish = localStorage.getItem('language') === 'english';

    // Set initial language state
    if (isEnglish) {
        switchToEnglish();
    }

    if (languageBtn) {
        // Set initial button text
        updateLanguageButton(languageBtn, isEnglish);

        languageBtn.addEventListener('click', function() {
            isEnglish = !isEnglish;

            // Save language preference
            localStorage.setItem('language', isEnglish ? 'english' : 'bangla');

            if (isEnglish) {
                switchToEnglish();
            } else {
                switchToBangla();
            }

            updateLanguageButton(this, isEnglish);
        });
    }
}

function updateLanguageButton(button, isEnglish) {
    if (isEnglish) {
        button.innerHTML = '<i class="fas fa-language"></i> English/বাংলা';
    } else {
        button.innerHTML = '<i class="fas fa-language"></i> বাংলা/English';
    }
}

function switchToEnglish() {
    console.log('Switching UI to English');

    // Change page titles
    const currentPage = getCurrentPage();
    const pageTitles = {
        'index.html': 'Our School - Government High School',
        'notice.html': 'Notices - Government High School',
        'about.html': 'About Us - Government High School',
        'students.html': 'Students - Government High School',
        'results.html': 'Results - Government High School',
        'academics.html': 'Academics - Government High School',
        'teachers.html': 'Teachers - Government High School',
        'gallery.html': 'Gallery - Government High School',
        'contact.html': 'Contact - Government High School'
    };

    document.title = pageTitles[currentPage] || 'Our School - Government High School';

    // English translations for UI elements only
    const uiTranslations = {
        // Navigation Menu Only
        'হোম': 'Home',
        'নোটিশ': 'Notices',
        'বিদ্যালয় সম্পর্কে': 'About',
        'স্টুডেন্ট': 'Students',
        'রেজাল্ট': 'Results',
        'একাডেমিক': 'Academics',
        'শিক্ষকবৃন্দ': 'Teachers',
        'গ্যালারি': 'Gallery',
        'যোগাযোগ': 'Contact',

        // Quick Links Only
        'অনলাইন ভর্তি': 'Online Admission',
        'ক্লাস রুটিন': 'Class Routine',
        'পরীক্ষার রুটিন': 'Exam Routine',
        'ডিজিটাল কন্টেন্ট': 'Digital Content',
        'লাইব্রেরি': 'Library',
        'শিক্ষক তথ্য': 'Teacher Info',

        // Section Headers Only
        'সর্বশেষ নোটিশ': 'Latest Notices',
        'বিদ্যালয়ের অগ্রগতি': 'School Progress',
        'বিদ্যালয়ের কার্যক্রম': 'School Activities',
        'নোটিশ বোর্ড': 'Notice Board',

        // Buttons and Labels Only
        'দেখুন': 'View',
        'আরও পড়ুন': 'Read More',
        'দ্রুত লিংক': 'Quick Links',
        'জরুরি হটলাইন': 'Emergency Hotlines',
        'আমাদের অবস্থান': 'Our Location',
        'বার্তা পাঠান': 'Send Message',
        'বিস্তারিত': 'Details',
        'স্কুল লগিন': 'School Login',

        // Hotlines Labels Only
        'জাতীয় হেল্পলাইন': 'National Helpline',
        'শিশু হেল্পলাইন': 'Child Helpline',
        'জরুরি সেবা': 'Emergency Service',

        // Footer Only
        'দরকারী লিংক': 'Useful Links',
        'সামাজিক যোগাযোগ': 'Social Media',
        'ডেভেলপড বাই': 'Developed by',
        'সকল স্বত্ব সংরক্ষিত।': 'All rights reserved.',

        // Contact Page Only
        'যোগাযোগ': 'Contact',
        'ঠিকানা': 'Address',
        'ফোন': 'Phone',
        'ইমেইল': 'Email',
        'কার্যকাল': 'Working Hours'
    };

    updateUITextContent(uiTranslations);
}

function switchToBangla() {
    console.log('Switching UI to Bangla');

    // Change page titles
    const currentPage = getCurrentPage();
    const pageTitles = {
        'index.html': 'আমাদের স্কুল - সরকারি উচ্চ বিদ্যালয়',
        'notice.html': 'নোটিশ - সরকারি উচ্চ বিদ্যালয়',
        'about.html': 'বিদ্যালয় সম্পর্কে - সরকারি উচ্চ বিদ্যালয়',
        'students.html': 'শিক্ষার্থী - সরকারি উচ্চ বিদ্যালয়',
        'results.html': 'রেজাল্ট - সরকারি উচ্চ বিদ্যালয়',
        'academics.html': 'একাডেমিক - সরকারি উচ্চ বিদ্যালয়',
        'teachers.html': 'শিক্ষকবৃন্দ - সরকারি উচ্চ বিদ্যালয়',
        'gallery.html': 'গ্যালারি - সরকারি উচ্চ বিদ্যালয়',
        'contact.html': 'যোগাযোগ - সরকারি উচ্চ বিদ্যালয়'
    };

    document.title = pageTitles[currentPage] || 'আমাদের স্কুল - সরকারি উচ্চ বিদ্যালয়';

    // Bangla translations for UI elements only
    const uiTranslations = {
        // Navigation Menu Only
        'Home': 'হোম',
        'Notices': 'নোটিশ',
        'About': 'বিদ্যালয় সম্পর্কে',
        'Students': 'স্টুডেন্ট',
        'Results': 'রেজাল্ট',
        'Academics': 'একাডেমিক',
        'Teachers': 'শিক্ষকবৃন্দ',
        'Gallery': 'গ্যালারি',
        'Contact': 'যোগাযোগ',

        // Quick Links Only
        'Online Admission': 'অনলাইন ভর্তি',
        'Class Routine': 'ক্লাস রুটিন',
        'Exam Routine': 'পরীক্ষার রুটিন',
        'Digital Content': 'ডিজিটাল কন্টেন্ট',
        'Library': 'লাইব্রেরি',
        'Teacher Info': 'শিক্ষক তথ্য',

        // Section Headers Only
        'Latest Notices': 'সর্বশেষ নোটিশ',
        'School Progress': 'বিদ্যালয়ের অগ্রগতি',
        'School Activities': 'বিদ্যালয়ের কার্যক্রম',
        'Notice Board': 'নোটিশ বোর্ড',

        // Buttons and Labels Only
        'View': 'দেখুন',
        'Read More': 'আরও পড়ুন',
        'Quick Links': 'দ্রুত লিংক',
        'Emergency Hotlines': 'জরুরি হটলাইন',
        'Our Location': 'আমাদের অবস্থান',
        'Send Message': 'বার্তা পাঠান',
        'Details': 'বিস্তারিত',
        'School Login': 'স্কুল লগিন',

        // Hotlines Labels Only
        'National Helpline': 'জাতীয় হেল্পলাইন',
        'Child Helpline': 'শিশু হেল্পলাইন',
        'Emergency Service': 'জরুরি সেবা',

        // Footer Only
        'Useful Links': 'দরকারী লিংক',
        'Social Media': 'সামাজিক যোগাযোগ',
        'Developed by': 'ডেভেলপড বাই',
        'All rights reserved.': 'সকল স্বত্ব সংরক্ষিত।',

        // Contact Page Only
        'Contact': 'যোগাযোগ',
        'Address': 'ঠিকানা',
        'Phone': 'ফোন',
        'Email': 'ইমেইল',
        'Working Hours': 'কার্যকাল'
    };

    updateUITextContent(uiTranslations);
}

function updateUITextContent(translations) {
    // Update only specific UI elements, not content

    // 1. Navigation Menu
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        let text = link.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                const icon = link.querySelector('i');
                link.textContent = '';
                if (icon) link.appendChild(icon);
                link.appendChild(document.createTextNode(' ' + value));
                break;
            }
        }
    });

    // 2. Quick Links
    const quickLinks = document.querySelectorAll('.link-btn');
    quickLinks.forEach(link => {
        let text = link.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                const icon = link.querySelector('i');
                link.textContent = '';
                if (icon) link.appendChild(icon);
                link.appendChild(document.createTextNode(' ' + value));
                break;
            }
        }
    });

    // 3. Section Headers (only specific ones)
    const sectionHeaders = document.querySelectorAll('.notice-section h2, .progress-section h2, .activities-section h2, .page-content h2');
    sectionHeaders.forEach(header => {
        let text = header.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                const icon = header.querySelector('i');
                header.textContent = '';
                if (icon) header.appendChild(icon);
                header.appendChild(document.createTextNode(' ' + value));
                break;
            }
        }
    });

    // 4. Buttons
    const buttons = document.querySelectorAll('.view-btn, .read-more, #loginBtn');
    buttons.forEach(button => {
        let text = button.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text.includes(key)) {
                const icon = button.querySelector('i');
                button.textContent = '';
                if (icon) button.appendChild(icon);
                button.appendChild(document.createTextNode(' ' + value));
                break;
            }
        }
    });

    // 5. Labels in sidebar
    const sidebarLabels = document.querySelectorAll('.quick-links h3, .hotlines h3, .map h3');
    sidebarLabels.forEach(label => {
        let text = label.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                const icon = label.querySelector('i');
                label.textContent = '';
                if (icon) label.appendChild(icon);
                label.appendChild(document.createTextNode(' ' + value));
                break;
            }
        }
    });

    // 6. Hotline items
    const hotlineItems = document.querySelectorAll('.hotline-info strong');
    hotlineItems.forEach(item => {
        let text = item.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                item.textContent = value;
                break;
            }
        }
    });

    // 7. Footer sections
    const footerSections = document.querySelectorAll('.footer-section h3');
    footerSections.forEach(section => {
        let text = section.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                const icon = section.querySelector('i');
                section.textContent = '';
                if (icon) section.appendChild(icon);
                section.appendChild(document.createTextNode(' ' + value));
                break;
            }
        }
    });

    // 8. Footer bottom
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        let text = footerBottom.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text.includes(key)) {
                footerBottom.textContent = text.replace(key, value);
                break;
            }
        }
    }

    // 9. Contact form labels
    const contactLabels = document.querySelectorAll('.contact-item h4');
    contactLabels.forEach(label => {
        let text = label.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                label.textContent = value;
                break;
            }
        }
    });

    // 10. Contact form placeholders and button
    const contactInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    contactInputs.forEach(input => {
        let placeholder = input.getAttribute('placeholder');
        if (placeholder) {
            for (const [key, value] of Object.entries(translations)) {
                if (placeholder === key) {
                    input.setAttribute('placeholder', value);
                    break;
                }
            }
        }
    });

    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        let text = submitBtn.textContent.trim();
        for (const [key, value] of Object.entries(translations)) {
            if (text === key) {
                submitBtn.textContent = value;
                break;
            }
        }
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
}