// ============================================================================
// PDF GENERATION MODULE FOR OFFERS
// Handles creation of professional PDF with form data and Syndicate stamp
// ============================================================================

/**
 * Generate a professional offers PDF document
 * @param {Object} formData - Form submission data
 */
function generateOffersPDF(formData) {
    // Create HTML content for PDF
    const pdfContent = createPDFContent(formData);

    // Configuration for html2pdf - A4 Landscape single page badge
    const options = {
        margin: [8, 8, 8, 8],
        filename: `Syndicate-Member-Badge-${formData.fullName.replace(/\s+/g, '-')}-${formatDate(new Date())}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
        pagebreak: { mode: 'avoid' }
    };

    // Generate and download PDF
    html2pdf()
        .set(options)
        .from(pdfContent)
        .save()
        .catch(error => {
            console.error('PDF generation error:', error);
            alert('There was an error generating your badge. Please try again.');
        });

    // Also store the data for email sending (if implemented)
    storeOfferData(formData);
}

/**
 * Create professional HTML content for the PDF
 * @param {Object} data - Form data
 * @returns {HTMLElement} - HTML element for PDF
 */
function createPDFContent(data) {
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

    container.innerHTML = `
        <div style="background: #fff; padding: 30px; border-radius: 12px; width: 95%; height: 95%; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 10px 40px rgba(0,0,0,0.2); position: relative;">
            
            <!-- Left Section: Member Info -->
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-right: 30px;">
                <h1 style="margin: 0 0 5px 0; color: #667eea; font-size: 32px; font-weight: 700;">MEMBER</h1>
                <h2 style="margin: 0 0 20px 0; color: #764ba2; font-size: 28px; font-weight: 600;">${escapeHtml(data.fullName)}</h2>
                
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Email</p>
                    <p style="margin: 0; font-size: 13px; color: #2c3e50; font-weight: 500;">${escapeHtml(data.email)}</p>
                </div>

                <div style="margin-bottom: 15px;">
                    <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Education</p>
                    <p style="margin: 0; font-size: 13px; color: #2c3e50; font-weight: 500;">${formatEducationLevel(data.educationLevel)}</p>
                </div>

                ${data.company ? `
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0 0 3px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Company</p>
                    <p style="margin: 0; font-size: 13px; color: #2c3e50; font-weight: 500;">${escapeHtml(data.company)}</p>
                </div>
                ` : ''}

                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #f0f0f0;">
                    <p style="margin: 0 0 5px 0; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase;">Services</p>
                    <p style="margin: 0; font-size: 12px; color: #667eea; font-weight: 600;">
                        ${data.offers && data.offers.length > 0 ? data.offers.join(', ') : 'Multiple Services'}
                    </p>
                </div>
            </div>

            <!-- Right Section: Certificate/Badge -->
            <div style="flex: 0.8; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-left: 30px; border-left: 2px solid #f0f0f0;">
                
                <!-- Stamp/Certificate -->
                ${generateStampSVG(data)}

                <!-- Expiration Info -->
                <div style="text-align: center; margin-top: 20px;">
                    <p style="margin: 0 0 3px 0; font-size: 12px; color: #999; font-weight: 600;">VALID UNTIL</p>
                    <p style="margin: 0; font-size: 18px; color: #27ae60; font-weight: 700;">${calculateExpirationDate(data.submittedAt)}</p>
                </div>

                <!-- Document ID -->
                <div style="margin-top: 15px; text-align: center;">
                    <p style="margin: 0; font-size: 10px; color: #999;">ID: ${generateDocumentId(data.email)}</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="position: absolute; bottom: 8px; left: 0; right: 0; text-align: center; font-size: 10px; color: #999;">
            © 2026 Syndicate Developers | Membership Badge | Valid for 2 Years
        </div>
    `;

    return container;
}

/**
 * Generate SVG stamp seal for the PDF
 * @param {Object} data - Form data with submission date
 * @returns {string} - SVG HTML string
 */
function generateStampSVG(data) {
    const today = new Date(data.submittedAt);
    const expiryDate = new Date(today);
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    const stampHTML = `
        <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3)); transform: rotate(-15deg);">
            <!-- Outer Circle -->
            <circle cx="110" cy="110" r="100" fill="none" stroke="#667eea" stroke-width="3" opacity="0.8"/>
            <circle cx="110" cy="110" r="95" fill="none" stroke="#667eea" stroke-width="1" opacity="0.5"/>
            
            <!-- Background Circle -->
            <circle cx="110" cy="110" r="92" fill="#667eea" opacity="0.08"/>
            
            <!-- Top Text (Curved) -->
            <defs>
                <path id="topArc" d="M 40,110 A 70,70 0 0,1 180,110" fill="none"/>
                <path id="bottomArc" d="M 180,110 A 70,70 0 0,1 40,110" fill="none"/>
            </defs>
            
            <text font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#667eea" letter-spacing="2">
                <textPath href="#topArc" startOffset="50%" text-anchor="middle">
                    SYNDICATE DEVELOPERS
                </textPath>
            </text>
            
            <!-- Bottom Text (Curved) -->
            <text font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#667eea" letter-spacing="1">
                <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
                    OFFICIALLY AUTHORIZED
                </textPath>
            </text>
            
            <!-- Center Content -->
            <g text-anchor="middle">
                <!-- Shield Icon -->
                <path d="M 110,60 L 130,70 L 130,95 Q 110,115 110,115 Q 90,115 90,95 L 90,70 Z" fill="#667eea" opacity="0.6"/>
                
                <!-- Checkmark -->
                <g transform="translate(110, 90)">
                    <circle r="12" fill="#667eea" opacity="0.2"/>
                    <path d="M -6,-2 L -1,4 L 8,-6" stroke="#667eea" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                
                <!-- Year validations -->
                <text x="110" y="125" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#667eea">
                    2 YEARS
                </text>
                <text x="110" y="142" font-family="Arial, sans-serif" font-size="9" fill="#667eea" opacity="0.8">
                    VALIDITY
                </text>
            </g>
            
            <!-- Decorative Elements -->
            <circle cx="110" cy="110" r="88" fill="none" stroke="#667eea" stroke-width="0.5" opacity="0.3" stroke-dasharray="2,3"/>
            
            <!-- Corner Stars -->
            <g fill="#667eea" opacity="0.6">
                <!-- Top star -->
                <polygon points="110,35 114,45 125,45 117,52 120,62 110,56 100,62 103,52 95,45 106,45"/>
                <!-- Bottom star -->
                <polygon points="110,185 114,195 125,195 117,202 120,212 110,206 100,212 103,202 95,195 106,195"/>
            </g>
        </svg>
        
        <div style="margin-top: -60px; position: relative; z-index: 1; text-align: center;">
            <p style="margin: 0; font-size: 12px; font-weight: 700; color: #667eea;">
                CERTIFIED & APPROVED
            </p>
            <p style="margin: 3px 0 0 0; font-size: 10px; color: #999;">
                Valid Until: ${formatMonthYear(expiryDate)}
            </p>
        </div>
    `;
    
    return stampHTML;
}

/**
 * Calculate expiration date (2 years from submission)
 * @param {string} submissionDate - ISO date string
 * @returns {string} - Formatted expiration date
 */
function calculateExpirationDate(submissionDate) {
    const submitted = new Date(submissionDate);
    const expiry = new Date(submitted);
    expiry.setFullYear(expiry.getFullYear() + 2);
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[expiry.getMonth()]} ${expiry.getDate()}, ${expiry.getFullYear()}`;
}

/**
 * Format date as Month, Year (e.g., "Mar 2028")
 * @param {Date} date - Date object
 * @returns {string} - Formatted date
 */
function formatMonthYear(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Generate custom offers based on education level and services
 * @param {Object} data - Form data
 * @returns {string} - HTML for offers
 */
function generateCustomOffers(data) {
    const offers = getOffersForProfile(data.educationLevel, data.offers);
    
    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${offers.map((offer, idx) => `
                <div style="background: #fff; padding: 12px; border-radius: 4px; border: 1px solid #e0e0e0; font-size: 12px;">
                    <h4 style="margin: 0 0 6px 0; color: #667eea; font-size: 13px;">${offer.name}</h4>
                    <p style="margin: 0 0 8px 0; color: #666; font-size: 11px;">${offer.description}</p>
                    <div style="background: #f8f9ff; padding: 8px; border-radius: 3px; font-weight: 600; color: #667eea;">
                        ${offer.priceRange}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Get personalized offers based on education and services
 * @param {string} educationLevel - Education level
 * @param {Array} services - Selected services
 * @returns {Array} - Offer objects
 */
function getOffersForProfile(educationLevel, services) {
    const baseOffers = {
        'Starter Package': {
            name: '🚀 Starter Package',
            description: 'Perfect for new projects and MVPs',
            priceRange: '$2,000 - $5,000'
        },
        'Professional Package': {
            name: '⭐ Professional Package',
            description: 'Advanced features and scalability',
            priceRange: '$5,000 - $15,000'
        },
        'Enterprise Package': {
            name: '🏢 Enterprise Package',
            description: 'Full-scale solution with support',
            priceRange: '$15,000+'
        },
        'Consulting Package': {
            name: '💼 Consulting Package',
            description: 'Strategic advice and direction',
            priceRange: '$500 - $2,000/month'
        }
    };

    // Select offers based on education level
    let selectedOffers = [];
    
    if (educationLevel === 'high-school' || educationLevel === 'diploma') {
        selectedOffers.push(baseOffers['Starter Package']);
    } else if (educationLevel === 'bachelor' || educationLevel === 'bootcamp') {
        selectedOffers.push(baseOffers['Starter Package']);
        selectedOffers.push(baseOffers['Professional Package']);
    } else if (educationLevel === 'master' || educationLevel === 'phd') {
        selectedOffers.push(baseOffers['Professional Package']);
        selectedOffers.push(baseOffers['Enterprise Package']);
        selectedOffers.push(baseOffers['Consulting Package']);
    } else {
        selectedOffers.push(baseOffers['Professional Package']);
    }

    // Add additional offers based on services selected
    if (services && services.includes('Consulting')) {
        selectedOffers.push(baseOffers['Consulting Package']);
    }

    // Remove duplicates
    const uniqueOffers = [];
    const seen = new Set();
    selectedOffers.forEach(offer => {
        if (!seen.has(offer.name)) {
            seen.add(offer.name);
            uniqueOffers.push(offer);
        }
    });

    return uniqueOffers.length > 0 ? uniqueOffers : [baseOffers['Professional Package']];
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} - Formatted date
 */
function formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Format education level for display
 * @param {string} level - Education level value
 * @returns {string} - Formatted education level
 */
function formatEducationLevel(level) {
    const levels = {
        'high-school': 'High School Diploma',
        'diploma': 'Diploma/Certificate Program',
        'bachelor': "Bachelor's Degree",
        'master': "Master's Degree",
        'phd': 'PhD/Doctorate',
        'self-taught': 'Self-Taught Developer',
        'bootcamp': 'Coding Bootcamp Graduate'
    };
    return levels[level] || level;
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Store offer data for potential email sending or backend
 * @param {Object} formData - Form data
 */
function storeOfferData(formData) {
    // Calculate expiration date 
    const submitted = new Date(formData.submittedAt);
    const expiry = new Date(submitted);
    expiry.setFullYear(expiry.getFullYear() + 2);

    const documentId = generateDocumentId(formData.email);
    
    const storageData = {
        ...formData,
        documentId: documentId,
        submittedDate: formatDate(submitted),
        expirationDate: calculateExpirationDate(formData.submittedAt),
        expirationTimestamp: expiry.toISOString(),
        isActive: true,
        validityPeriod: '2 Years'
    };

    // Store in localStorage
    localStorage.setItem(`offer-${formData.email}-${documentId}`, JSON.stringify(storageData));

    // Also store in a global offers array
    let allOffers = JSON.parse(localStorage.getItem('allOffers') || '[]');
    allOffers.push(storageData);
    localStorage.setItem('allOffers', JSON.stringify(allOffers));

    console.log('✅ Offer stored with expiration:', {
        documentId: documentId,
        submitted: formatDate(submitted),
        expires: calculateExpirationDate(formData.submittedAt),
        email: formData.email
    });
    
    return storageData;
}

/**
 * Generate unique document ID
 * @param {string} email - Email address
 * @returns {string} - Document ID
 */
function generateDocumentId(email) {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `SD-${timestamp}-${randomStr}`.toUpperCase();
}

// Make functions globally available
window.generateOffersPDF = generateOffersPDF;
window.generateCustomOffers = generateCustomOffers;
window.getOffersForProfile = getOffersForProfile;
window.storeOfferData = storeOfferData;
window.generateStampSVG = generateStampSVG;
window.calculateExpirationDate = calculateExpirationDate;
window.formatMonthYear = formatMonthYear;

/**
 * Check if an offer is still valid
 * @param {string} expirationTimestamp - ISO expiration date
 * @returns {boolean} - True if offer is still valid
 */
function isOfferValid(expirationTimestamp) {
    const expiryDate = new Date(expirationTimestamp);
    const today = new Date();
    return today <= expiryDate;
}

/**
 * Get all active offers (not expired)
 * @returns {Array} - Array of valid offers
 */
function getActiveOffers() {
    const allOffers = JSON.parse(localStorage.getItem('allOffers') || '[]');
    return allOffers.filter(offer => isOfferValid(offer.expirationTimestamp));
}

/**
 * Get days remaining until expiration
 * @param {string} expirationTimestamp - ISO expiration date
 * @returns {number} - Days remaining
 */
function getDaysRemaining(expirationTimestamp) {
    const expiryDate = new Date(expirationTimestamp);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

/**
 * Get offer status badge
 * @param {string} expirationTimestamp - ISO expiration date
 * @returns {string} - Status badge HTML
 */
function getOfferStatusBadge(expirationTimestamp) {
    const daysRemaining = getDaysRemaining(expirationTimestamp);
    
    if (daysRemaining < 0) {
        return '<span style="color: #e74c3c; font-weight: 600;">EXPIRED</span>';
    } else if (daysRemaining < 30) {
        return `<span style="color: #f39c12; font-weight: 600;">EXPIRES SOON (${daysRemaining} days)</span>`;
    } else {
        return `<span style="color: #27ae60; font-weight: 600;">ACTIVE (${daysRemaining} days)</span>`;
    }
}

// Make utility functions globally available
window.isOfferValid = isOfferValid;
window.getActiveOffers = getActiveOffers;
window.getDaysRemaining = getDaysRemaining;
window.getOfferStatusBadge = getOfferStatusBadge;
