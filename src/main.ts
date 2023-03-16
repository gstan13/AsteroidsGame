import { Game } from "./Game";
import { GameScene } from "./scenes/GameScene";

// Get the canvas element and its 2D context
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

if (!context) {
  throw new Error("Failed to get canvas context");
}

// Initialize the game
const game = new Game();

// Create and set the initial scene
const gameScene = new GameScene(context);
game.setScene(gameScene);

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Start the game loop
let lastTime = performance.now();

function gameLoop() {
  const currentTime = performance.now();
  const dt = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Update and render the game
  game.update(dt);
  game.render();

  requestAnimationFrame(gameLoop);
}

gameLoop();
