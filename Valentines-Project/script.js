// Get elements
const mainMenu = document.getElementById("mainMenu");
const startButton = document.getElementById("startButton");

// Navigate to game page
function showGame(){
	window.location.href = "game.html";
}

// Event listener
startButton.addEventListener("click", showGame);

// Initialize
console.log("Word Game Menu loaded!");
