// Ending page code

// Get elements
const evelynCanvas = document.getElementById("evelynSprite");
const evelynCtx = evelynCanvas.getContext("2d");
const letterCollection = document.getElementById("letterCollection");
const valentineReveal = document.getElementById("valentineReveal");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const messageText = document.getElementById("messageText");
const messageBox = document.getElementById("messageBox");

// Load Evelyn sprite sheet
const evelynSpriteSheet = new Image();
evelynSpriteSheet.src = 'Finalversion.png';

// Load Ending sprite sheet
const endingSpriteSheet = new Image();
endingSpriteSheet.src = 'Ending.png';

// Animation variables
const totalFrames = 12;
let currentFrame = 0;
let lastFrameTime = 0;
const fps = 20;
const frameDuration = 1000 / fps;
let stopAnimation = false;
let useEndingSprite = false;

// Congratulations dialogue
const congratsDialogue = [
    "Congratulations! You got it! 🎉",
    "So... that was my little game. I called it 'EVELYN'S MBTI IN YOU'",
    "I know, I know... kind of a weird name, right? Haha",
    "But here's the thing... there's actually a catch with the name",
    "If you take the letters from 'EVELYN'S MBTI IN YOU' and combine them with 'WALL-E'...",
    "They spell out something special..."
];
let currentDialogue = 0;

// Animate Evelyn continuously
function animateEvelyn(timestamp) {
    if (stopAnimation) return; // Stop animation if flag is set
    
    if (timestamp - lastFrameTime >= frameDuration) {
        evelynCtx.imageSmoothingEnabled = false;
        evelynCtx.clearRect(0, 0, evelynCanvas.width, evelynCanvas.height);
        
        const spriteSheet = useEndingSprite ? endingSpriteSheet : evelynSpriteSheet;
        
        if (spriteSheet.complete) {
            const frameWidth = spriteSheet.width / totalFrames;
            const frameHeight = spriteSheet.height;
            const sourceX = currentFrame * frameWidth;
            
            evelynCtx.drawImage(
                spriteSheet,
                sourceX, 0, frameWidth, frameHeight,
                0, 0, 250, 250
            );
        }
        
        currentFrame = (currentFrame + 1) % totalFrames;
        lastFrameTime = timestamp;
    }
    
    requestAnimationFrame(animateEvelyn);
}

// Show dialogue text
function showDialogue(index) {
    if (index < congratsDialogue.length) {
        messageText.textContent = congratsDialogue[index];
    }
}

// Advance to next dialogue
function nextDialogue() {
    currentDialogue++;
    
    // Show letter collection at specific dialogues
    if (currentDialogue === 2) {
        // After "So... that was my little game. I called it 'EVELYN'S MBTI IN YOU'"
        collectLetters("EVELYN'S MBTI IN YOU");
    } else if (currentDialogue === 5) {
        // After "If you take the letters from 'EVELYN'S MBTI IN YOU' and combine them with 'WALL-E'..."
        addWalleLetters();
    }
    
    if (currentDialogue < congratsDialogue.length) {
        showDialogue(currentDialogue);
    } else {
        // End of dialogue - hide message box and show reveal
        messageBox.style.opacity = '0';
        setTimeout(() => {
            messageBox.style.display = 'none';
            showValentineReveal();
        }, 300);
    }
}

// Collect letters animation
function collectLetters(text) {
    letterCollection.innerHTML = '<div class="title">Notable words:</div>';
    letterCollection.classList.remove('hidden');
    letterCollection.classList.add('show');
    
    // Define the words to display
    const words = ['EVELYN', 'MBTI', 'IN', 'YOU'];
    
    words.forEach((word, wordIndex) => {
        setTimeout(() => {
            const wordRow = document.createElement('div');
            wordRow.className = 'word-row';
            
            word.split('').forEach((letter, letterIndex) => {
                setTimeout(() => {
                    const letterSpan = document.createElement('span');
                    letterSpan.className = 'collected-letter';
                    letterSpan.textContent = letter;
                    wordRow.appendChild(letterSpan);
                }, letterIndex * 80);
            });
            
            letterCollection.appendChild(wordRow);
        }, wordIndex * 300);
    });
}

// Add WALLE letters
function addWalleLetters() {
    const wordRow = document.createElement('div');
    wordRow.className = 'word-row';
    
    const walleLetters = "WALLE".split('');
    walleLetters.forEach((letter, index) => {
        setTimeout(() => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'collected-letter';
            letterSpan.textContent = letter;
            wordRow.appendChild(letterSpan);
        }, index * 80);
    });
    
    letterCollection.appendChild(wordRow);
}

// Show final Valentine reveal
function showValentineReveal() {
    const targetPhrase = "WILLYOUBEMYVALENTINE?";
    const allLetters = Array.from(letterCollection.querySelectorAll('.collected-letter'));
    
    // Get all letter texts
    const sourceLetters = allLetters.map(el => el.textContent).join('');
    const targetLetters = targetPhrase.split('');
    
    console.log('Source letters:', sourceLetters);
    console.log('Target letters:', targetLetters);
    
    // Map which source letter goes to which target position
    const letterMap = [];
    let usedIndices = new Set();
    
    targetLetters.forEach((targetLetter, idx) => {
        for (let i = 0; i < sourceLetters.length; i++) {
            if (!usedIndices.has(i) && sourceLetters[i] === targetLetter) {
                letterMap.push(i);
                usedIndices.add(i);
                console.log(`Target[${idx}] "${targetLetter}" maps to Source[${i}] "${sourceLetters[i]}"`);
                break;
            }
        }
    });
    
    console.log('Letter map:', letterMap);
    
    targetLetters.forEach(targetLetter => {
        for (let i = 0; i < sourceLetters.length; i++) {
            if (!usedIndices.has(i) && sourceLetters[i] === targetLetter) {
                letterMap.push(i);
                usedIndices.add(i);
                break;
            }
        }
    });
    
    // Hide unused letters
    allLetters.forEach((letter, index) => {
        if (!letterMap.includes(index)) {
            setTimeout(() => {
                letter.style.opacity = '0';
                letter.style.transform = 'scale(0)';
            }, 300);
        }
    });
    
    // Create target container on the right side
    setTimeout(() => {
        const targetContainer = document.createElement('div');
        targetContainer.id = 'targetContainer';
        targetContainer.style.cssText = `
            position: absolute;
            top: 50%;
            right: 80px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 16;
            max-width: 500px;
        `;
        
        // Create rows for the phrase (split by words)
        const words = ['WILL', 'YOU', 'BE', 'MY', 'VALENTINE?'];
        
        words.forEach(word => {
            const wordRow = document.createElement('div');
            wordRow.style.cssText = `
                display: flex;
                gap: 8px;
                justify-content: flex-start;
            `;
            
            word.split('').forEach(letter => {
                const placeholder = document.createElement('span');
                placeholder.className = 'collected-letter valentine';
                placeholder.textContent = letter;
                placeholder.style.opacity = '0';
                placeholder.style.visibility = 'hidden';
                placeholder.style.pointerEvents = 'none';
                wordRow.appendChild(placeholder);
            });
            
            targetContainer.appendChild(wordRow);
        });
        
        document.getElementById('endingContainer').appendChild(targetContainer);
        
        // Wait for layout to stabilize before getting target positions
        setTimeout(() => {
            // Get all target positions AFTER container is fully rendered
            const targetElements = Array.from(targetContainer.querySelectorAll('.collected-letter'));
            
            // Capture ALL positions first before any letter moves
            const positions = [];
            allLetters.forEach(letter => {
                positions.push({
                    element: letter,
                    rect: letter.getBoundingClientRect()
                });
            });
            
            const targetPositions = [];
            targetElements.forEach(target => {
                targetPositions.push(target.getBoundingClientRect());
            });
            
            // Move letters one by one sequentially
            letterMap.forEach((sourceIndex, targetIdx) => {
                setTimeout(() => {
                    const letter = allLetters[sourceIndex];
                    const sourceRect = positions[sourceIndex].rect;
                    const targetRect = targetPositions[targetIdx];
                    
                    // Make letter absolutely positioned at exact current visual location
                    letter.style.position = 'fixed';
                    letter.style.left = sourceRect.left + 'px';
                    letter.style.top = sourceRect.top + 'px';
                    letter.style.width = sourceRect.width + 'px';
                    letter.style.height = sourceRect.height + 'px';
                    letter.style.margin = '0';
                    letter.style.transform = 'none';
                    letter.style.zIndex = '100';
                    
                    // Force a reflow
                    void letter.offsetHeight;
                    
                    // Apply valentine styling
                    letter.classList.add('valentine');
                    
                    // Apply transition
                    letter.style.transition = 'left 1.2s ease-in-out, top 1.2s ease-in-out';
                    
                    // Move to target position
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            letter.style.left = targetRect.left + 'px';
                            letter.style.top = targetRect.top + 'px';
                        });
                    });
                    
                }, targetIdx * 700); // 700ms delay between each letter
            });
            
            // Show final Valentine message
            setTimeout(() => {
                targetContainer.remove();
                letterCollection.style.opacity = '0';
                
                setTimeout(() => {
                    allLetters.forEach(l => l.style.display = 'none');
                    letterCollection.classList.add('hidden');
                    
                    // Keep Evelyn visible, just move her to bottom left
                    evelynCanvas.style.transition = 'all 1s ease';
                    evelynCanvas.style.position = 'absolute';
                    evelynCanvas.style.bottom = '20px';
                    evelynCanvas.style.left = '20px';
                    evelynCanvas.style.top = 'auto';
                    evelynCanvas.style.transform = 'scale(0.8)';
                    
                    valentineReveal.classList.remove('hidden');
                    setTimeout(() => {
                        valentineReveal.classList.add('show');
                    }, 100);
                }, 1000);
            }, letterMap.length * 700 + 2500);
            
        }, 100); // Wait 100ms for target container to fully render
        
    }, 800);
}

// Button handlers
yesButton.addEventListener('click', () => {
    // Hide the valentine reveal
    valentineReveal.style.opacity = '0';
    
    setTimeout(() => {
        valentineReveal.style.display = 'none';
        
        // Move Evelyn back to center
        evelynCanvas.style.transition = 'all 1s ease';
        evelynCanvas.style.position = 'absolute';
        evelynCanvas.style.top = '50%';
        evelynCanvas.style.left = '50%';
        evelynCanvas.style.bottom = 'auto';
        evelynCanvas.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Switch to ending sprite animation
        setTimeout(() => {
            useEndingSprite = true;
            currentFrame = 0; // Reset to first frame
        }, 1000);
        
        // Show final message box with YAAY!
        setTimeout(() => {
            messageBox.style.display = 'block';
            messageBox.style.opacity = '1';
            messageText.textContent = 'YAAY! 🎉💖✨';
            
            // Remove the continue indicator
            const continueIndicator = messageBox.querySelector('.continue-indicator');
            if (continueIndicator) {
                continueIndicator.style.display = 'none';
            }
        }, 1000);
    }, 300);
});

noButton.addEventListener('click', () => {
    // No button runs away or does something funny
    noButton.style.position = 'absolute';
    noButton.style.left = Math.random() * 80 + '%';
    noButton.style.top = Math.random() * 80 + '%';
});

// Click message box to advance dialogue
messageBox.addEventListener('click', nextDialogue);

// Start the sequence
evelynSpriteSheet.onload = function() {
    requestAnimationFrame(animateEvelyn);
    // Show first dialogue
    messageBox.style.display = 'block';
    messageBox.style.opacity = '1';
    showDialogue(0);
};
