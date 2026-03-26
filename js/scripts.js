// Professional interaction scripts

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.querySelector('.ai-nav');
    const body = document.body;

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (nav) {
                nav.classList.toggle('expanded');
            }
            if (body) {
                body.classList.toggle('sidebar-expanded');
            }
            navToggle.setAttribute('aria-expanded', nav && nav.classList.contains('expanded') ? 'true' : 'false');
        });
    }

    // Smooth scrolling for anchor links only (not page navigation)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Allow normal navigation for page links (no preventDefault)
    const pageLinks = document.querySelectorAll('.nav-link:not([href^="#"]), .cta-nav:not([href^="#"])');
    pageLinks.forEach(link => {
        link.style.cursor = 'pointer';
    });

    // Star Rating System (guarded)
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('review-rating');
    const ratingText = document.querySelector('.rating-text');
    const ratingTexts = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    if (stars && stars.length && ratingInput && ratingText) {
        stars.forEach((star, idx) => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-value'), 10) || 0;
                ratingInput.value = rating;

                // Update display
                stars.forEach(s => s.classList.remove('active'));
                for (let i = 0; i < rating && i < stars.length; i++) {
                    stars[i].classList.add('active');
                    stars[i].style.color = '#f39c12';
                }

                // Update rating text
                ratingText.textContent = ratingTexts[Math.max(0, rating - 1)] || '';
            });

            // Hover effect
            star.addEventListener('mouseover', function() {
                const hoverValue = parseInt(this.getAttribute('data-value'), 10) || 0;
                stars.forEach((s, index) => {
                    if (index < hoverValue) {
                        s.style.color = '#f39c12';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
        });

        // Reset on mouse leave
        const starsContainer = document.querySelector('.stars');
        if (starsContainer) {
            starsContainer.addEventListener('mouseleave', function() {
                stars.forEach(star => {
                    if (star.classList.contains('active')) {
                        star.style.color = '#f39c12';
                    } else {
                        star.style.color = '#ddd';
                    }
                });
            });
        }

        // Set initial star rating display
        const initialRating = parseInt(ratingInput.value, 10) || 0;
        for (let i = 0; i < initialRating && i < stars.length; i++) {
            stars[i].classList.add('active');
            stars[i].style.color = '#f39c12';
        }
    }

    // Form submission with validation for Formspree
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields (Name, Email, and Project Description).');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Formspree will handle the submission
            // Add success/error handling after submission
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Review Form submission with validation for Formspree
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            const name = document.getElementById('review-name').value.trim();
            const company = document.getElementById('review-company').value.trim();
            const rating = document.getElementById('review-rating').value;
            const review = document.getElementById('review-text').value.trim();

            if (!name || !company || !review || !rating) {
                e.preventDefault();
                alert('Please fill in all fields and provide a rating.');
                return;
            }

            // Show loading state
            const submitBtn = reviewForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Formspree will handle the submission
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Add animation on scroll
    const sections = document.querySelectorAll('.section, .cta-section, .support-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Smooth scroll behavior for the whole page
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Language change function
function changeLanguage() {
    const lang = document.getElementById('language-select').value;
    // For now, just show an alert. In a real implementation, this would load translated content
    const langNames = {
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'zh': '中文',
        'ja': '日本語',
        'pt': 'Português',
        'ar': 'العربية'
    };
    alert(`Language changed to ${langNames[lang]}!\n\nNote: Full translation implementation would require a complete internationalization system with translated content files.`);
}

// Small typing effect for top code runner
document.addEventListener('DOMContentLoaded', function() {
    const runner = document.getElementById('code-runner');
    if (!runner) return;
    const lines = [
        "const server = start('production');",
        "await deploy();",
        "console.log('Deployed ✅');",
        "monitor.ensureUptime(99.99);",
    ];
    let i = 0, j = 0, forward = true;

    function tick() {
        const current = lines[i];
        if (forward) {
            j++;
            runner.textContent = current.slice(0, j) + (j % 2 ? '|' : '');
            if (j >= current.length) {
                forward = false;
                setTimeout(tick, 900);
                return;
            }
        } else {
            j--;
            runner.textContent = current.slice(0, j) + (j % 2 ? '|' : '');
            if (j <= 0) {
                forward = true;
                i = (i + 1) % lines.length;
            }
        }
        setTimeout(tick, forward ? 60 : 24);
    }
    tick();
});

// Parallax for floating hero images and hero code stream
document.addEventListener('DOMContentLoaded', function() {
    const floats = Array.from(document.querySelectorAll('.hero-floating'));
    const heroCode = document.querySelector('.hero-code-lines');
    if (floats.length === 0 && !heroCode) return;

    let lastMove = 0;
    const throttle = (fn, wait) => (...args) => {
        const now = Date.now();
        if (now - lastMove > wait) { lastMove = now; fn(...args); }
    };

    function moveHandler(e) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const x = (e.clientX / w) - 0.5; // -0.5 .. 0.5
        const y = (e.clientY / h) - 0.5;

        floats.forEach((el, idx) => {
            const depth = (idx + 1) * 6; // different speeds
            const tx = x * depth * -1; // invert for layered parallax
            const ty = y * depth * -1;
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        });

        if (heroCode) {
            // slight tilt/translate for code block
            const kx = x * 12;
            const ky = y * 8;
            heroCode.style.transform = `translate3d(${kx}px, ${ky}px, 0)`;
        }
    }

    window.addEventListener('mousemove', throttle(moveHandler, 12));
});

// Continuous hero background code stream
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.hero-code-lines');
    if (!container) return;

    const snippets = [
        "async function deploy() {",
        "  await build();",
        "  await test();",
        "  await release();",
        "}",
        "const pipeline = [\"build\", \"test\", \"release\"];",
        "monitor.on('alert', (e) => { console.warn(e); });",
        "db.migrate().then(() => console.log('migrations ok'));",
        "// scaling to thousands of nodes...",
        "console.log('ready');"
    ];

    // create a buffer of lines (DOM-based, newest at bottom)
    const maxLines = 30;
    container.innerHTML = '';

    function escapeHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function highlight(snippet) {
        // naive highlighting: keywords, functions, strings, comments, numbers
        let s = escapeHtml(snippet);
        // comments
        s = s.replace(/(\/\/.*$)/gm, '<span class="hl-comment">$1</span>');
        // strings
        s = s.replace(/("[^"]*"|'[^']*')/g, '<span class="hl-str">$1</span>');
        // keywords
        s = s.replace(/\b(async|await|const|let|function|return|if|else|for|while|var|new|class|const)\b/g, '<span class="hl-kw">$1</span>');
        // functions or method names (simple)
        s = s.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="hl-fn">$1</span>');
        // numbers
        s = s.replace(/\b(\d+)\b/g, '<span class="hl-num">$1</span>');
        return s;
    }

    function pushLine(html) {
        const el = document.createElement('div');
        el.className = 'code-line';
        el.innerHTML = html;
        // set rise duration
        el.style.setProperty('--rise-duration', HERO_RISE_MS + 'ms');
        // append at DOM end; container is flex column anchored to bottom
        container.appendChild(el);
        // make visible immediately then start rising shortly after so it travels bottom->top
        requestAnimationFrame(() => el.classList.add('show'));
        setTimeout(() => el.classList.add('rise'), 40);
        // keep lines visible: trim oldest when we exceed buffer
        while (container.children.length > maxLines) {
            container.removeChild(container.firstChild);
        }
    }

    // type a random snippet then push (shows plain typing, then final highlighted line)
    function typeAndPush(snippet) {
        let i = 0;
        const chars = snippet + ' ';
        // create or reuse typing element
        let typingEl = container.querySelector('.code-line.typing');
        if (!typingEl) {
            typingEl = document.createElement('div');
            typingEl.className = 'code-line typing';
            container.appendChild(typingEl);
        }

        const step = () => {
            i++;
            const part = escapeHtml(chars.slice(0, i));
            typingEl.innerHTML = part;
            if (i < chars.length) {
                setTimeout(step, HERO_CHAR_MIN + Math.random()*HERO_CHAR_VAR);
            } else {
                // finalize with highlighted HTML
                typingEl.classList.remove('typing');
                typingEl.innerHTML = highlight(snippet);
                // show and start rise almost immediately so line flows from bottom to top
                requestAnimationFrame(() => typingEl.classList.add('show'));
                typingEl.style.setProperty('--rise-duration', HERO_RISE_MS + 'ms');
                setTimeout(() => typingEl.classList.add('rise'), 40);
                // keep lines visible: trim oldest when we exceed buffer
                while (container.children.length > maxLines) {
                    container.removeChild(container.firstChild);
                }
            }
        };
        step();
    }

    // code stream control: expose start/stop so UI can pause/resume
    const HERO_INTERVAL_MS = 500; // time between new lines (ms)
    const HERO_CHAR_MIN = 6; // min per-char ms
    const HERO_CHAR_VAR = 12; // additional random ms
    const HERO_RISE_MS = 2500; // how long a line takes to rise (ms)

    window.__heroCodeInterval = null;
    function startHeroCodeStream() {
        if (window.__heroCodeInterval) return;
        window.__heroCodeInterval = setInterval(() => {
            const s = snippets[Math.floor(Math.random()*snippets.length)];
            typeAndPush(s);
        }, HERO_INTERVAL_MS);
    }

    function stopHeroCodeStream() {
        if (window.__heroCodeInterval) {
            clearInterval(window.__heroCodeInterval);
            window.__heroCodeInterval = null;
        }
    }

    // start by default
    startHeroCodeStream();

    // UI toggle if present
    const heroToggleBtn = document.getElementById('hero-toggle');
    const heroMedia = document.querySelector('.hero-media');
    const floatingEls = Array.from(document.querySelectorAll('.hero-floating'));

    function setHeroPaused(paused) {
        if (paused) {
            stopHeroCodeStream();
            if (heroMedia) heroMedia.classList.add('paused');
            floatingEls.forEach(el => el.classList.add('paused'));
            if (container) container.classList.add('paused');
            if (heroToggleBtn) {
                heroToggleBtn.textContent = 'Play';
                heroToggleBtn.setAttribute('aria-pressed', 'true');
            }
        } else {
            startHeroCodeStream();
            if (heroMedia) heroMedia.classList.remove('paused');
            floatingEls.forEach(el => el.classList.remove('paused'));
            if (container) container.classList.remove('paused');
            if (heroToggleBtn) {
                heroToggleBtn.textContent = 'Pause';
                heroToggleBtn.setAttribute('aria-pressed', 'false');
            }
        }
    }

    if (heroToggleBtn) {
        heroToggleBtn.addEventListener('click', function() {
            const pressed = heroToggleBtn.getAttribute('aria-pressed') === 'true';
            setHeroPaused(!pressed);
        });
    }

    // Expose controls for debugging / manual trigger
    window.startHeroCodeStream = startHeroCodeStream;
    window.stopHeroCodeStream = stopHeroCodeStream;
});

// Contact member function with email integration
function contactMember(memberName, type) {
    // Define member emails
    const memberEmails = {
        'Alifam Murithi': 'ebt1.12336.24@student.tharaka.ac.ke',
        'Benaresa Arisa': 'ebt1.12323.24@student.tharaka.ac.ke',
        'Tobias Asitiba': 'ebt1.12363.24@student.tharaka.ac.ke',
        'Davis Njagi': 'ebt1.12337.24@student.tharaka.ac.ke',
        'Sylous OCS': 'ebt1.12328.24@student.tharaka.ac.ke',
        'Syndicate Team': 'info@syndicatedev.example'
    };

    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill the message field based on type
        setTimeout(() => {
            const messageField = document.getElementById('message');
            if (messageField) {
                const currentMessage = messageField.value;
                const prefilledMessage = currentMessage ? currentMessage + '\n\n' : '';
                const memberEmail = memberEmails[memberName] || '';
                let messageText = '';
                
                if (type === 'request') {
                    messageText = `I'd like to send a project request to ${memberName}. Please provide details about their availability and how to proceed.\n\nContact: ${memberEmail}`;
                } else if (type === 'question') {
                    messageText = `I'd like to ask ${memberName} a question about their expertise in their field.\n\nContact: ${memberEmail}`;
                } else {
                    messageText = `I'd like to contact ${memberName} regarding a potential collaboration.\n\nContact: ${memberEmail}`;
                }
                
                messageField.value = prefilledMessage + messageText;
                messageField.focus();
            }
        }, 1000); // Wait for scroll to complete
    }
}

// Newsletter form handler
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate newsletter subscription
                console.log('Newsletter subscription:', email);
                alert(`Thank you for subscribing! We'll send the latest insights to ${email}.\n\nNote: In a production environment, this would integrate with an email service provider.`);
                this.reset();
            }
        });
    }
});

// Apply for job function
function applyJob(jobTitle) {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill the message field
        setTimeout(() => {
            const messageField = document.getElementById('message');
            if (messageField) {
                const currentMessage = messageField.value;
                const prefilledMessage = currentMessage ? currentMessage + '\n\n' : '';
                messageField.value = prefilledMessage + `I'm interested in applying for the ${jobTitle} position. Here's a bit about my background and why I'd be a great fit for the team...`;
                messageField.focus();
            }
        }, 1000);
    }
}

// ============================================================================
// OFFERS FORM SUBMISSION WITH FORMSPREE + PDF
// ============================================================================

const modal = document.getElementById('offers-modal');
const openBtn = document.getElementById('open-offers-btn');
const closeBtn = document.getElementById('close-offers-modal');
const offersForm = document.getElementById('offers-form');

/**
 * Handle offers form submission with Formspree + PDF generation
 * @param {Event} e - Form submit event
 */
function handleOffersSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        fullName: document.getElementById('offer-name').value.trim(),
        email: document.getElementById('offer-email').value.trim(),
        educationLevel: document.getElementById('education-level').value,
        company: document.getElementById('offer-company').value.trim(),
        phone: document.getElementById('offer-phone').value.trim(),
        offers: [],
        submittedAt: new Date().toISOString()
    };

    // Collect selected offers
    const offerCheckboxes = document.querySelectorAll('input[name="offers"]:checked');
    offerCheckboxes.forEach(cb => {
        formData.offers.push(cb.value);
    });

    // Validate that at least one offer is selected
    if (formData.offers.length === 0) {
        alert('⚠️ Please select at least one service offering to continue.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
    }

    // Get submit button and show loading state
    const submitBtn = offersForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Create hidden fields for Formspree
    const hiddenFields = {
        '_subject': `New Offer Request from ${formData.fullName}`,
        '_replyto': formData.email,
        '_captcha': 'false',
        fullName: formData.fullName,
        email: formData.email,
        educationLevel: formData.educationLevel,
        company: formData.company || '(Not provided)',
        phone: formData.phone || '(Not provided)',
        selectedServices: formData.offers.join(', '),
        submittedAt: new Date().toLocaleString()
    };

    // Prepare FormData for submission
    const requestData = new FormData();
    Object.keys(hiddenFields).forEach(key => {
        requestData.append(key, hiddenFields[key]);
    });

    // Submit to Formspree asynchronously
    fetch('https://formspree.io/f/xyknzbnq', {
        method: 'POST',
        body: requestData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('✅ Form submitted to Formspree');
            
            // Store offer data with expiration
            storeOfferData(formData);
            
            // Generate PDF
            generateOffersPDF(formData);
            
            // Reset form
            offersForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Close modal with delay for download
            setTimeout(() => {
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }

                // Calculate expiration date for notification
                const expiryDate = new Date(formData.submittedAt);
                expiryDate.setFullYear(expiryDate.getFullYear() + 2);
                const expiryFormatted = expiryDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });

                // Show success notification
                showSuccessNotification(
                    `✅ Offer Submitted Successfully!\n\n` +
                    `📄 PDF Downloaded to your device\n` +
                    `📧 Confirmation sent to ${formData.email}\n\n` +
                    `⏰ Valid Until: ${expiryFormatted}\n` +
                    `📞 We'll contact you within 24 hours`
                );
            }, 500);
        } else {
            throw new Error('Formspree submission failed');
        }
    })
    .catch(error => {
        console.error('Formspree error:', error);
        
        // Still generate PDF even if Formspree fails
        storeOfferData(formData);
        generateOffersPDF(formData);
        
        offersForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        setTimeout(() => {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            showSuccessNotification(
                `✅ Offer Generated Successfully!\n\n` +
                `📄 PDF Downloaded to your device\n` +
                `⏰ Valid for 2 years\n\n` +
                `📧 Manual email: syndicatedev19@gmail.com`
            );
        }, 500);
    });
}

// Open Modal
if (openBtn) {
    openBtn.addEventListener('click', function() {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
}

// Close Modal
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

/**
 * Show success notification
 * @param {string} message - Message to display
 */
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        line-height: 1.5;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(400px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 8 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 8000);
}

// Make functions globally available
window.handleOffersSubmit = handleOffersSubmit;
window.showSuccessNotification = showSuccessNotification;

// Developer Showcase Carousel
let currentCarouselIndex = 0;
const carouselImages = document.querySelectorAll('.carousel-image');
const carouselDots = document.querySelectorAll('.dot');
const totalSlides = carouselImages.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentCarouselIndex = 0;
    } else if (index < 0) {
        currentCarouselIndex = totalSlides - 1;
    } else {
        currentCarouselIndex = index;
    }
    
    carouselImages.forEach(img => img.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    
    if (carouselImages[currentCarouselIndex]) {
        carouselImages[currentCarouselIndex].classList.add('active');
    }
    if (carouselDots[currentCarouselIndex]) {
        carouselDots[currentCarouselIndex].classList.add('active');
    }
}

function currentSlide(index) {
    showSlide(index);
    resetCarouselTimer();
}

let carouselTimer;

function autoAdvanceCarousel() {
    currentCarouselIndex++;
    if (currentCarouselIndex >= totalSlides) {
        currentCarouselIndex = 0;
    }
    showSlide(currentCarouselIndex);
}

function resetCarouselTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(autoAdvanceCarousel, 4000);
}

if (carouselImages.length > 0) {
    resetCarouselTimer();
}

/**
 * Universal form handler for contact, review, and newsletter forms
 * Generates PDF from form data and sends to Formspree
 * @param {Event} e - Form submit event
 * @param {string} formType - 'contact', 'review', or 'newsletter'
 */
function handleUniversalFormSubmit(e, formType) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    let formData = {
        formType: formType,
        submittedAt: new Date().toISOString()
    };

    // Collect form data based on type
    if (formType === 'contact') {
        formData = {
            ...formData,
            name: document.getElementById('name')?.value.trim() || '',
            email: document.getElementById('email')?.value.trim() || '',
            company: document.getElementById('company')?.value.trim() || '',
            projectType: document.getElementById('project-type')?.value || '',
            message: document.getElementById('message')?.value.trim() || '',
            subject: 'Contact Form Inquiry'
        };
    } else if (formType === 'review') {
        const reviewRating = document.getElementById('review-rating')?.value || '5';
        formData = {
            ...formData,
            name: document.getElementById('review-name')?.value.trim() || '',
            email: form.querySelector('input[name="email"]')?.value?.trim() || 'no-email@syndicatedev.local',
            company: document.getElementById('review-company')?.value.trim() || '',
            rating: reviewRating,
            review: document.getElementById('review-text')?.value.trim() || '',
            subject: `New Review Submission - ${reviewRating} Stars`
        };
    } else if (formType === 'newsletter') {
        formData = {
            ...formData,
            email: document.getElementById('newsletter-email')?.value.trim() || '',
            subject: 'Newsletter Subscription'
        };
    }

    // Validate required fields
    if (!formData.email || !formData.email.includes('@')) {
        alert('⚠️ Please enter a valid email address.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
    }

    // Create hidden fields for Formspree
    const hiddenFields = {
        '_subject': formData.subject,
        '_replyto': formData.email || 'noreply@syndicatedev.local',
        '_captcha': 'false'
    };

    // Add form-specific data
    Object.keys(formData).forEach(key => {
        if (key !== 'subject' && key !== 'submittedAt') {
            hiddenFields[key] = formData[key];
        }
    });

    // Prepare FormData for submission
    const requestData = new FormData();
    Object.keys(hiddenFields).forEach(key => {
        requestData.append(key, hiddenFields[key]);
    });

    // Submit to Formspree
    fetch('https://formspree.io/f/xyknzbnq', {
        method: 'POST',
        body: requestData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('✅ Form submitted to Formspree');
            
            // Generate PDF for non-newsletter forms
            if (formType !== 'newsletter') {
                generateUniversalPDF(formData, formType);
            }
            
            // Reset form
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Show success notification
            const messages = {
                contact: `✅ Message Sent!\n\n📧 Confirmation sent to ${formData.email}\n\n📞 We'll respond within 2 hours`,
                review: `✅ Review Submitted!\n\n📧 Thank you for your feedback\n\n💌 We appreciate your support`,
                newsletter: `✅ Subscribed!\n\n📧 Check ${formData.email} for confirmation`
            };

            showSuccessNotification(messages[formType] || 'Form submitted successfully!');
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        alert('⚠️ There was an error submitting your form. Please try again.');
    });
}

/**
 * Generate PDF for contact and review forms
 * @param {Object} formData - Form data to include in PDF
 * @param {string} formType - Type of form (contact or review)
 */
function generateUniversalPDF(formData, formType) {
    const container = document.createElement('div');
    container.style.cssText = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #2c3e50;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 12px;
        width: 297mm;
        height: 210mm;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
    `;

    // Generate form-specific content
    let content = '';
    if (formType === 'contact') {
        content = `
            <div style="background: #fff; padding: 30px; border-radius: 12px; width: 95%; height: 95%; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <h1 style="color: #667eea; font-size: 28px; margin: 0 0 20px 0;">Project Inquiry</h1>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Name</p>
                        <p style="margin: 0; font-size: 14px; color: #2c3e50; font-weight: 500;">${escapeHtml(formData.name)}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Email</p>
                        <p style="margin: 0; font-size: 14px; color: #2c3e50; font-weight: 500;">${escapeHtml(formData.email)}</p>
                    </div>
                </div>

                ${formData.company ? `
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Company</p>
                    <p style="margin: 0; font-size: 14px; color: #2c3e50; font-weight: 500;">${escapeHtml(formData.company)}</p>
                </div>
                ` : ''}

                ${formData.projectType ? `
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Project Type</p>
                    <p style="margin: 0; font-size: 14px; color: #2c3e50; font-weight: 500;">${escapeHtml(formData.projectType)}</p>
                </div>
                ` : ''}

                <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
                    <p style="margin: 0 0 5px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Message</p>
                    <p style="margin: 0; font-size: 13px; color: #2c3e50; line-height: 1.6;">${escapeHtml(formData.message).replace(/\n/g, '<br>')}</p>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #f0f0f0; font-size: 10px; color: #999;">
                    <p style="margin: 0;">Submitted: ${new Date(formData.submittedAt).toLocaleString()}</p>
                    <p style="margin: 5px 0 0 0;">© 2026 Syndicate Developers</p>
                </div>
            </div>
        `;
    } else if (formType === 'review') {
        const stars = Array(parseInt(formData.rating)).fill('⭐').join('');
        content = `
            <div style="background: #fff; padding: 30px; border-radius: 12px; width: 95%; height: 95%; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <h1 style="color: #667eea; font-size: 28px; margin: 0 0 10px 0;">Client Review</h1>
                <div style="color: #ffc107; font-size: 24px; margin-bottom: 20px;">${stars}</div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Name</p>
                        <p style="margin: 0; font-size: 14px; color: #2c3e50; font-weight: 500;">${escapeHtml(formData.name)}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Company/Role</p>
                        <p style="margin: 0; font-size: 14px; color: #2c3e50; font-weight: 500;">${escapeHtml(formData.company)}</p>
                    </div>
                </div>

                <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
                    <p style="margin: 0 0 5px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Review</p>
                    <p style="margin: 0; font-size: 13px; color: #2c3e50; line-height: 1.6;">${escapeHtml(formData.review).replace(/\n/g, '<br>')}</p>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #f0f0f0; font-size: 10px; color: #999;">
                    <p style="margin: 0;">Submitted: ${new Date(formData.submittedAt).toLocaleString()}</p>
                    <p style="margin: 5px 0 0 0;">© 2026 Syndicate Developers</p>
                </div>
            </div>
        `;
    }

    container.innerHTML = content;
    document.body.appendChild(container);

    // Generate PDF
    html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: `Syndicate-${formType === 'contact' ? 'Inquiry' : 'Review'}-${new Date().getTime()}.pdf`,
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
        pagebreak: { mode: 'avoid' }
    }).save().then(() => {
        container.remove();
    }).catch(err => {
        console.error('PDF generation error:', err);
        container.remove();
    });
}

// Make form handler globally available
window.handleUniversalFormSubmit = handleUniversalFormSubmit;