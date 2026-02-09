// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    const heartSymbols = ['💕', '💖', '💗', '💓', '💝', '❤️', '🩷'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 15 + 15; // 15-30px
        heart.style.fontSize = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 4 + 6; // 6-10 seconds
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, (duration + 2) * 1000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 800);
    
    // Create initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 300);
    }
}

// Start hearts when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingHearts);
} else {
    createFloatingHearts();
}
