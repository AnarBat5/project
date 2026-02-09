# 💝 Valentine's Word Game

A romantic Valentine's Day themed word game created with HTML, CSS, and JavaScript.

## 🌐 Live Demo

Once GitHub Pages is enabled, your game will be available at:
**https://anarbat5.github.io/Valentines-Project/**

## 🎮 About the Game

This is an interactive Valentine's Day word game featuring:
- A word guessing game (similar to Wordle)
- Custom character sprites
- Romantic message sequences
- Interactive UI with animations
- A special Valentine's Day proposal

## 🚀 Deployment Instructions

### Setting up GitHub Pages

1. Go to your repository on GitHub: `https://github.com/AnarBat5/Valentines-Project`
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. The deployment workflow will automatically trigger when you push to the `main` branch

### Manual Deployment Trigger

You can also manually trigger the deployment:
1. Go to the **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the branch and click "Run workflow"

## 📁 Project Structure

```
Valentines-Project/
├── index.html          # Landing page with start button
├── game.html          # Main word game interface
├── ending.html        # Final Valentine's message page
├── style.css          # All styling
├── script.js          # Landing page logic
├── game.js           # Main game logic
├── ending.js         # Ending page logic
├── hearts.js         # Heart animations
├── Ending.png        # Sprite image
├── Finalversion.png  # Sprite image
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions deployment workflow
```

## 💻 Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/AnarBat5/Valentines-Project.git
   cd Valentines-Project
   ```

2. Open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. Navigate to `http://localhost:8000` in your browser

## 🔗 Sharing Your Game

Once deployed, you can share your game by sending the GitHub Pages URL:
```
https://anarbat5.github.io/Valentines-Project/
```

## 🛠️ Technologies Used

- HTML5
- CSS3 (with animations)
- Vanilla JavaScript
- Canvas API for sprites

## 📝 License

This is a personal project. Feel free to fork and customize for your own romantic purposes! 💕

---

Made with ❤️ for Valentine's Day
