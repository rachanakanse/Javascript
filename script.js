const gameArea = document.getElementById("gameArea");
const statusText = document.getElementById("status");
const healthText = document.getElementById("health");
const levelText = document.getElementById("level");
const ghostSound = document.getElementById("ghostSound");

let ghostVisible = false;
let gameOver = false;
let health = 3;
let level = 1;
let spawnSpeed = 3000;

// Torch
gameArea.addEventListener("click", () => {
  if (gameOver) return;

  gameArea.classList.add("light");

  setTimeout(() => {
    gameArea.classList.remove("light");
  }, 300);

  if (ghostVisible) {
    statusText.innerText = "😨 Ghost scared away!";
    removeGhost();
    levelUp();
  }
});

// Spawn Ghost + Shadow
function spawnGhost() {
  if (gameOver) return;

  const ghost = document.createElement("div");
  ghost.classList.add("ghost");

  const shadow = document.createElement("div");
  shadow.classList.add("shadow");

  let x = Math.random() * 320;
  let y = Math.random() * 320;

  ghost.style.left = x + "px";
  ghost.style.top = y + "px";

  shadow.style.left = x - 20 + "px";
  shadow.style.top = y - 20 + "px";

  gameArea.appendChild(shadow);
  gameArea.appendChild(ghost);

  ghostVisible = true;

  // Play sound
  ghostSound.currentTime = 0;
  ghostSound.play();

  // If player fails
  setTimeout(() => {
    if (ghostVisible) {
      health--;
      healthText.innerText = health;

      if (health <= 0) {
        statusText.innerText = "💀 GAME OVER!";
        gameOver = true;
      } else {
        statusText.innerText = "😱 Ghost hit you!";
      }

      removeGhost();
    }
  }, 1500 - level * 100); // harder each level
}

// Remove ghost + shadow
function removeGhost() {
  document.querySelectorAll(".ghost, .shadow").forEach(e => e.remove());
  ghostVisible = false;
}

// Level up
function levelUp() {
  level++;
  levelText.innerText = level;

  spawnSpeed = Math.max(800, spawnSpeed - 200);
}

// Game loop
setInterval(() => {
  if (!ghostVisible && !gameOver) {
    spawnGhost();
  }
}, spawnSpeed);
