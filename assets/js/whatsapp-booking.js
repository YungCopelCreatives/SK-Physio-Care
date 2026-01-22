/**
* WhatsApp Integration for SK Physio Care
* Floating WhatsApp button and booking functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    // Create floating WhatsApp button
    const whatsappButton = document.createElement('div');
    whatsappButton.innerHTML = `
        <a href="https://wa.me/27727868683?text=I%20would%20like%20to%20book%20an%20appointment%20for%20physiotherapy" 
           class="whatsapp-float" 
           target="_blank" 
           rel="noopener noreferrer">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    
    // Add styles for floating button
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #25d366;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .whatsapp-float:hover {
            background-color: #128C7E;
            transform: scale(1.1);
            color: #FFF;
        }
        
        .whatsapp-float i {
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .whatsapp-float {
                width: 50px;
                height: 50px;
                bottom: 30px;
                right: 30px;
                font-size: 24px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(whatsappButton);
    
    // Add business hours indicator
    const businessHours = {
        weekdays: { open: 8, close: 16 }, // 8AM - 4PM
        saturday: { open: null, close: null }, // Urgent only
        sunday: { open: null, close: null } // Closed
    };
    
    function isBusinessHours() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hour = now.getHours();
        
        if (day === 0) return false; // Sunday closed
        if (day === 6) return false; // Saturday urgent only
        
        return hour >= businessHours.weekdays.open && hour < businessHours.weekdays.close;
    }
    
    // Update WhatsApp message based on business hours
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/27727868683"]');
    whatsappLinks.forEach(link => {
        if (isBusinessHours()) {
            link.href = "https://wa.me/27727868683?text=I%20would%20like%20to%20book%20an%20appointment%20for%20physiotherapy";
        } else {
            link.href = "https://wa.me/27727868683?text=I%20would%20like%20to%20book%20an%20appointment%20for%20physiotherapy%20(Urgent)";
        }
    });
});
