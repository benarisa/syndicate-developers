// Intelligent Chatbot Logic
const chatbotKnowledge = {
    services: {
        keywords: ['service', 'services', 'what do you', 'what do you offer', 'offer', 'do you do', 'do'],
        response: `We offer comprehensive software development services:
                
✅ Web Development ($2,500 - $15,000)
✅ Mobile Apps ($5,000 - $25,000)
✅ AI & ML Solutions ($8,000 - $50,000)
✅ Cloud Services ($1,500 - $8,000/month)
✅ Consulting ($150 - $300/hour)
✅ Support & Maintenance ($500 - $5,000/month)

Want details about any specific service?`
    },
    pricing: {
        keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'how much', 'expensive', 'affordable', 'budget'],
        response: `Here's our pricing breakdown:

💻 Web Development: $2,500 - $15,000
📱 Mobile Apps: $5,000 - $25,000 per app
🤖 AI/ML Solutions: $8,000 - $50,000
☁️ Cloud Services: $1,500 - $8,000/month
💡 Consulting: $150 - $300/hour
🔧 Support & Maintenance: $500 - $5,000/month

Pricing varies based on complexity. Want a custom quote?`
    },
    about: {
        keywords: ['about', 'who are you', 'company', 'team', 'who', 'background'],
        response: `We're Syndicate Developers, a professional software development company with global presence! 🌍

Our Team:
👨‍💼 Davis Njagi  
👩‍💼 Benaresa Arisa
👨‍💼 Tobias Asitiba
👨‍💼 Alifam Murithi
👨‍💼 Sylous OCS

We specialize in web apps, mobile development, AI solutions, cloud services, and enterprise consulting. Our mission is to deliver innovative, high-quality software that drives your business growth.

📊 50+ Projects | 500M+ Daily Transactions Handled | 1M+ Users Served`
    },
    contact: {
        keywords: ['contact', 'email', 'phone', 'call', 'reach', 'how to reach', 'message', 'talk to'],
        response: `Ready to get in touch? Here are our contact options:

📧 Email: syndicatedev19@gmail.com
📞 Phone: +254-703-143-073
🕐 Availability: 24/7 Support

You can also visit our Contact page to send a message directly, or use this chat to discuss your project needs!`
    },
    portfolio: {
        keywords: ['portfolio', 'work', 'projects', 'case studies', 'examples', 'what have you done', 'show'],
        response: `Check out our impressive portfolio! 🎯

Featured Projects:
🚀 Global FinTech Platform - 500M+ daily transactions
🛍️ E-Commerce Solution - 40% conversion increase
🏥 Healthcare System - 1M+ patient records
📊 AI Analytics Platform - 100TB+ data processing

Our team has successfully delivered projects across various industries including finance, healthcare, retail, and enterprise solutions.

Visit our Portfolio page to see detailed case studies!`
    },
    hiring: {
        keywords: ['hiring', 'job', 'career', 'work', 'join', 'apply', 'opportunity'],
        response: `Interested in joining our team? 🎉

We're always looking for talented developers, designers, and engineers! Current opportunities include:
- Senior Full-Stack Developers
- Mobile App Developers
- AI/ML Engineers
- DevOps Specialists

Check our Careers page for detailed job listings, benefits, and application process. All applications are reviewed promptly!`
    },
    blog: {
        keywords: ['blog', 'article', 'news', 'read', 'learning', 'tips', 'tutorial'],
        response: `Great question! 📚 We publish regular articles on:
- Latest Technology Trends
- Best Development Practices
- Case Studies & Success Stories
- Industry Insights

Visit our Blog section to read articles from our team experts including Alifam, Tobias, Benaresa, Sylous, and Davis. Stay updated with weekly insights!`
    },
    greeting: {
        keywords: ['hi', 'hello', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening'],
        response: `Hey there! 👋 Welcome to Syndicate Developers! I'm Davis. How can I assist you today? Feel free to ask about our services, pricing, team, or anything else!`
    },
    default: {
        response: `Thanks for your message! 😊

I can help you with:
✨ Our Services & Expertise
💰 Pricing Information  
👥 Meet Our Team
📁 Portfolio & Case Studies
💼 Career Opportunities
📞 Contact Information
📚 Blog & Resources

What would you like to know? Just ask!`
    }
};

function findMatchingResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, data] of Object.entries(chatbotKnowledge)) {
        if (data.keywords) {
            for (const keyword of data.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    return data.response;
                }
            }
        }
    }
    
    return chatbotKnowledge.default.response;
}

function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    if (isUser) {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">${escapeHtml(text)}</div>
            </div>
            <div class="message-avatar">👤</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">💬</div>
            <div class="message-content">
                <div class="message-bubble">${escapeHtml(text)}</div>
                <div class="message-author">Davis</div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input-field');
    const chatWindow = document.getElementById('chat-window');
    
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            const badge = document.getElementById('chat-badge');
            chatWindow.classList.toggle('active');
            chatToggle.classList.toggle('active');
            badge.style.display = 'none';
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWindow.classList.remove('active');
            chatToggle.classList.remove('active');
        });
    }

    if (chatSend) {
        chatSend.addEventListener('click', function() {
            const message = chatInput.value.trim();
            
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
                
                setTimeout(() => {
                    const response = findMatchingResponse(message);
                    addMessage(response, false);
                }, 500);
            }
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                chatSend.click();
            }
        });
    }

    // Show badge on page load
    setTimeout(() => {
        const badge = document.getElementById('chat-badge');
        if (badge) {
            badge.style.display = 'flex';
        }
    }, 2000);
});
