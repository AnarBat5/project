// Game code starts here

// Get elements
const evelynCanvas = document.getElementById("evelynSprite");
const evelynCtx = evelynCanvas.getContext("2d");
const messageText = document.getElementById("messageText");
const messageBox = document.getElementById("messageBox");
const wordleGame = document.getElementById("wordleGame");
const wordleGrid = document.getElementById("wordleGrid");
const keyboard = document.getElementById("keyboard");
const hintBubble = document.getElementById("hintBubble");
const hintText = document.getElementById("hintText");
const letterCollection = document.getElementById("letterCollection");
const valentineReveal = document.getElementById("valentineReveal");

// Load Evelyn sprite sheet
const evelynSpriteSheet = new Image();
evelynSpriteSheet.src = 'Finalversion.png';

// Animation variables
const totalFrames = 12;
let currentFrame = 0;
let lastFrameTime = 0;
const fps = 20;
const frameDuration = 1000 / fps;

// Dialogue system
const dialogue = [
    "Hi there! I'm Evelyn, your guide for today",
    "I've got a little game for you. Just follow me, pay attention… and let's see what surprises we can find!"
];
let currentDialogue = 0;

// Congratulations dialogue
const congratsDialogue = [
    "Congratulations! You got it! 🎉",
    "So... that was my little game. I called it 'EVELYN'S MBTI IN YOU'",
    "I know, I know... kind of a weird name, right? Haha",
    "But here's the thing... there's actually a catch with the name",
    "If you take the letters from 'EVELYN'S MBTI IN YOU' and combine them with 'WALL-E'...",
    "They spell out something special..."
];
let currentCongratsDialogue = 0;

// Wordle game variables
const targetWord = "WALLE";
const maxGuesses = 6;
let currentGuess = "";
let currentRow = 0;
const guesses = [];

// Hints for each attempt
const hints = [
    "Go ahead! Don't worry if you miss, I'll give you hints after each round.",
    "Hint: Think of a cute robot! 🤖",
    "Hint: This little guy loves cleaning... and Earth!",
    "Hint: He's a Pixar character who found love in space!",
    "Hint: W-A-L-L... you're so close!",
    "Hint: It's a 5-letter name of a beloved robot!",
    "Hint: Last chance! The robot who met EVE! 💚"
];

// Animate Evelyn continuously
function animateEvelyn(timestamp) {
    if (timestamp - lastFrameTime >= frameDuration) {
        evelynCtx.imageSmoothingEnabled = false;
        evelynCtx.clearRect(0, 0, evelynCanvas.width, evelynCanvas.height);
        
        if (evelynSpriteSheet.complete) {
            const frameWidth = evelynSpriteSheet.width / totalFrames;
            const frameHeight = evelynSpriteSheet.height;
            const sourceX = currentFrame * frameWidth;
            
            evelynCtx.drawImage(
                evelynSpriteSheet,
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
    if (index < dialogue.length) {
        messageText.textContent = dialogue[index];
    }
}

// Initialize Wordle grid
function initWordleGrid() {
    for (let i = 0; i < maxGuesses; i++) {
        const row = document.createElement('div');
        row.className = 'grid-row';
        row.id = `row-${i}`;
        
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.id = `cell-${i}-${j}`;
            row.appendChild(cell);
        }
        
        wordleGrid.appendChild(row);
    }
}

// Initialize keyboard
function initKeyboard() {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
    ];
    
    keys.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyButton = document.createElement('button');
            keyButton.className = 'key';
            keyButton.textContent = key;
            if (key === 'ENTER' || key === 'BACK') {
                keyButton.classList.add('wide');
            }
            keyButton.addEventListener('click', () => handleKeyPress(key));
            rowDiv.appendChild(keyButton);
        });
        
        keyboard.appendChild(rowDiv);
    });
}

// Handle key press
function handleKeyPress(key) {
    if (key === 'ENTER') {
        submitGuess();
    } else if (key === 'BACK') {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateGrid();
        }
    } else if (currentGuess.length < 5) {
        currentGuess += key;
        updateGrid();
    }
}

// Update grid display
function updateGrid() {
    const row = document.getElementById(`row-${currentRow}`);
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${currentRow}-${i}`);
        cell.textContent = currentGuess[i] || '';
        if (currentGuess[i]) {
            cell.classList.add('filled');
        } else {
            cell.classList.remove('filled');
        }
    }
}

// Submit guess
function submitGuess() {
    if (currentGuess.length !== 5) return;
    
    guesses.push(currentGuess);
    checkGuess(currentGuess, currentRow);
    
    if (currentGuess === targetWord) {
        setTimeout(() => {
            // Fade out game and move Evelyn back to center
            wordleGame.classList.remove('show');
            setTimeout(() => {
                wordleGame.classList.add('hidden');
                evelynCanvas.classList.remove('bottom-left');
                // Redirect to ending page
                setTimeout(() => {
                    window.location.href = 'ending.html';
                }, 800);
            }, 800);
        }, 1500);
    } else if (currentRow >= maxGuesses - 1) {
        setTimeout(() => {
            alert(`The word was ${targetWord}`);
        }, 1500);
    } else {
        // Show hint for wrong guess (currentRow + 1 because index 0 is initial message)
        showHint(currentRow + 1);
        currentRow++;
        currentGuess = '';
    }
}

// Show congratulations dialogue
function showCongratsDialogue(index) {
    if (index < congratsDialogue.length) {
        messageText.textContent = congratsDialogue[index];
        currentCongratsDialogue = index;
    }
}

// Collect letters animation
function collectLetters(text) {
    letterCollection.innerHTML = '';
    letterCollection.classList.remove('hidden');
    letterCollection.classList.add('show');
    
    // Replace apostrophe with question mark for visual display
    const displayText = text.replace(/'/g, '?');
    const letters = displayText.replace(/[^A-Z?]/g, '').split('');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'collected-letter';
            letterSpan.textContent = letter;
            letterCollection.appendChild(letterSpan);
        }, index * 100);
    });
}

// Show final Valentine reveal
function showValentineReveal() {
    const targetPhrase = "WILL YOU BE MY VALENTINE?";
    const allLetters = Array.from(letterCollection.querySelectorAll('.collected-letter'));
    const targetLetters = targetPhrase.replace(/\s/g, '').split(''); // Remove spaces for mapping
    
    // Map which source letter goes to which target position
    const letterMap = [];
    const sourceLetters = allLetters.map(el => el.textContent).join('');
    
    // Create letter mapping
    let usedIndices = new Set();
    targetLetters.forEach(targetLetter => {
        for (let i = 0; i < sourceLetters.length; i++) {
            if (!usedIndices.has(i) && sourceLetters[i] === targetLetter) {
                letterMap.push(i);
                usedIndices.add(i);
                break;
            }
        }
    });
    
    // Prepare container for final layout
    letterCollection.style.gap = '12px';
    letterCollection.style.maxWidth = '900px';
    
    // Hide unused letters first
    allLetters.forEach((letter, index) => {
        if (!letterMap.includes(index)) {
            letter.style.opacity = '0';
            letter.style.transform = 'scale(0)';
        }
    });
    
    // Create target positions and move letters one by one
    setTimeout(() => {
        const targetContainer = document.createElement('div');
        targetContainer.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            max-width: 900px;
            justify-content: center;
            align-items: center;
            z-index: 16;
        `;
        
        // Create placeholder elements for positioning
        targetPhrase.split('').forEach(letter => {
            const placeholder = document.createElement('span');
            placeholder.className = 'collected-letter valentine';
            placeholder.textContent = letter;
            placeholder.style.opacity = '0';
            if (letter === ' ') {
                placeholder.style.padding = '0 15px';
                placeholder.style.border = 'none';
            }
            targetContainer.appendChild(placeholder);
        });
        
        document.getElementById('gameContainer').appendChild(targetContainer);
        
        // Get target positions
        const targetPositions = [];
        let targetIndex = 0;
        Array.from(targetContainer.children).forEach(placeholder => {
            if (placeholder.textContent !== ' ') {
                const rect = placeholder.getBoundingClientRect();
                targetPositions.push({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                });
            } else {
                targetIndex++;
            }
        });
        
        // Animate each letter to its position
        let animationIndex = 0;
        letterMap.forEach((sourceIndex, targetIdx) => {
            setTimeout(() => {
                const letter = allLetters[sourceIndex];
                const sourceRect = letter.getBoundingClientRect();
                const sourceX = sourceRect.left + sourceRect.width / 2;
                const sourceY = sourceRect.top + sourceRect.height / 2;
                
                const targetPos = targetPositions[targetIdx];
                const deltaX = targetPos.x - sourceX;
                const deltaY = targetPos.y - sourceY;
                
                letter.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
                letter.classList.add('valentine');
                
            }, animationIndex * 150);
            animationIndex++;
        });
        
        // Clean up and show final message
        setTimeout(() => {
            targetContainer.remove();
            letterCollection.style.opacity = '0';
            
            setTimeout(() => {
                letterCollection.classList.add('hidden');
                valentineReveal.classList.remove('hidden');
                setTimeout(() => {
                    valentineReveal.classList.add('show');
                }, 100);
            }, 1000);
        }, animationIndex * 150 + 3000);
        
    }, 1000);
}

// Advance congratulations dialogue
function nextCongratsDialogue() {
    currentCongratsDialogue++;
    
    // Show letter collection at specific dialogues
    if (currentCongratsDialogue === 2) {
        // After "So... that was my little game. I called it 'EVELYN'S MBTI IN YOU'"
        collectLetters("EVELYN'S MBTI IN YOU");
    } else if (currentCongratsDialogue === 5) {
        // After "If you take the letters from 'EVELYN? MBTI IN YOU' and combine them with 'WALL-E'..."
        const existing = letterCollection.querySelectorAll('.collected-letter');
        const walleLetters = "WALLE".split('');
        walleLetters.forEach((letter, index) => {
            setTimeout(() => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'collected-letter';
                letterSpan.textContent = letter;
                letterCollection.appendChild(letterSpan);
            }, index * 100);
        });
    }
    
    if (currentCongratsDialogue < congratsDialogue.length) {
        showCongratsDialogue(currentCongratsDialogue);
    } else {
        // End of congratulations dialogue - show final reveal
        messageBox.style.opacity = '0';
        setTimeout(() => {
            messageBox.style.display = 'none';
            showValentineReveal();
        }, 300);
    }
}

// Show hint bubble
function showHint(attemptNumber) {
    if (attemptNumber < hints.length) {
        hintText.textContent = hints[attemptNumber];
        hintBubble.classList.remove('hidden');
        hintBubble.classList.add('show');
        
        // Hide hint after 3 seconds
        setTimeout(() => {
            hintBubble.classList.remove('show');
            setTimeout(() => {
                hintBubble.classList.add('hidden');
            }, 300);
        }, 4000);
    }
}

// Check guess and color tiles
function checkGuess(guess, row) {
    const letters = targetWord.split('');
    const guessLetters = guess.split('');
    const result = Array(5).fill('absent');
    
    // Check for correct positions
    guessLetters.forEach((letter, i) => {
        if (letter === letters[i]) {
            result[i] = 'correct';
            letters[i] = null;
        }
    });
    
    // Check for present letters
    guessLetters.forEach((letter, i) => {
        if (result[i] === 'absent' && letters.includes(letter)) {
            result[i] = 'present';
            letters[letters.indexOf(letter)] = null;
        }
    });
    
    // Apply colors to grid
    result.forEach((status, i) => {
        setTimeout(() => {
            const cell = document.getElementById(`cell-${row}-${i}`);
            cell.classList.add(status);
        }, i * 200);
    });
}

// Advance to next dialogue
function nextDialogue() {
    currentDialogue++;
    if (currentDialogue < dialogue.length) {
        showDialogue(currentDialogue);
    } else {
        // All dialogue finished - transition to game
        messageBox.style.opacity = '0';
        setTimeout(() => {
            messageBox.style.display = 'none';
            evelynCanvas.classList.add('bottom-left');
            // Show Wordle game
            setTimeout(() => {
                wordleGame.classList.remove('hidden');
                wordleGame.classList.add('show');
                // Show initial encouragement
                showHint(0);
            }, 400);
        }, 300);
    }
}

// Click message box to advance dialogue
messageBox.addEventListener('click', () => {
    if (currentCongratsDialogue >= 0 && messageBox.style.opacity === '1' && wordleGame.classList.contains('hidden')) {
        // In congratulations mode
        nextCongratsDialogue();
    } else {
        // In initial dialogue mode
        nextDialogue();
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (!wordleGame.classList.contains('show')) return;
    
    if (e.key === 'Enter') {
        handleKeyPress('ENTER');
    } else if (e.key === 'Backspace') {
        handleKeyPress('BACK');
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
    }
});

// Start animation when sprite loads
evelynSpriteSheet.onload = function() {
    requestAnimationFrame(animateEvelyn);
    showDialogue(0);
    initWordleGrid();
    initKeyboard();
};

