const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

// Definições iniciais de Pac-Man e Fantasmas
let pacMan = { x: 8, y: 8, direction: 'right', alive: true };
let ghosts = [
  { x: 3, y: 3, direction: 'down' },
  { x: 15, y: 3, direction: 'up' }
];
let pellets = [];
let score = 0;

// Função para gerar as pílulas de comida no tabuleiro
function generatePellets() {
  pellets = [];
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      if (Math.random() < 0.1) {
        pellets.push({ x: i, y: j });
      }
    }
  }
}

// Função para desenhar tudo na tela
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenhando o Pac-Man
  ctx.beginPath();
  ctx.arc(pacMan.x * gridSize + gridSize / 2, pacMan.y * gridSize + gridSize / 2, gridSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();

  // Desenhando os fantasmas
  ghosts.forEach(ghost => {
    ctx.beginPath();
    ctx.arc(ghost.x * gridSize + gridSize / 2, ghost.y * gridSize + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  });

  // Desenhando as pílulas
  pellets.forEach(pellet => {
    ctx.beginPath();
    ctx.arc(pellet.x * gridSize + gridSize / 2, pellet.y * gridSize + gridSize / 2, gridSize / 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  });

  // Atualizando a pontuação
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, canvas.height - 10);
}

// Função para movimentar o Pac-Man
function movePacMan() {
  switch (pacMan.direction) {
    case 'up':
      pacMan.y -= 1;
      break;
    case 'down':
      pacMan.y += 1;
      break;
    case 'left':
      pacMan.x -= 1;
      break;
    case 'right':
      pacMan.x += 1;
      break;
  }
  
  // Colidindo com as bordas
  if (pacMan.x < 0) pacMan.x = gridWidth - 1;
  if (pacMan.x >= gridWidth) pacMan.x = 0;
  if (pacMan.y < 0) pacMan.y = gridHeight - 1;
  if (pacMan.y >= gridHeight) pacMan.y = 0;
  
  // Comendo pílulas
  pellets = pellets.filter(pellet => {
    if (pellet.x === pacMan.x && pellet.y === pacMan.y) {
      score += 10;
      return false;
    }
    return true;
  });
}

// Função para movimentar os fantasmas
function moveGhosts() {
  ghosts.forEach(ghost => {
    switch (ghost.direction) {
      case 'up':
        ghost.y -= 1;
        break;
      case 'down':
        ghost.y += 1;
        break;
      case 'left':
        ghost.x -= 1;
        break;
      case 'right':
        ghost.x += 1;
        break;
    }
    
    // Colidindo com as bordas
    if (ghost.x < 0) ghost.x = gridWidth - 1;
    if (ghost.x >= gridWidth) ghost.x = 0;
    if (ghost.y < 0) ghost.y = gridHeight - 1;
    if (ghost.y >= gridHeight) ghost.y = 0;
  });
}

// Função para detectar colisões com fantasmas
function checkCollisions() {
  ghosts.forEach(ghost => {
    if (ghost.x === pacMan.x && ghost.y === pacMan.y) {
      pacMan.alive = false;
    }
  });
}

// Função principal do jogo
function gameLoop() {
  if (!pacMan.alive) {
    alert('Game Over! Final Score: ' + score);
    return;
  }

  movePacMan();
  moveGhosts();
  checkCollisions();
  draw();
  
  setTimeout(gameLoop, 100);
}

// Iniciando o jogo
generatePellets();
gameLoop();

// Controle do Pac-Man
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') pacMan.direction = 'up';
  if (e.key === 'ArrowDown') pacMan.direction = 'down';
  if (e.key === 'ArrowLeft') pacMan.direction = 'left';
  if (e.key === 'ArrowRight') pacMan.direction = 'right';
});