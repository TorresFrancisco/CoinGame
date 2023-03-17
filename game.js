// Clase para representar al jugador
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
  }

  move(x, y) {
    // Mueve al jugador a una nueva posición
    this.x = x;
    this.y = y;
  }

  increaseScore(points) {
    // Incrementa la puntuación del jugador
    this.score += points;
  }
}

// Clase para representar a los obstáculos
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Clase para representar el juego
class Bomberman {
  constructor() {
    this.board = [];
    this.player = null;
    this.obstacles = [];
    this.coins = [];
    this.score = 0;
    this.gameOver = false;
  }

  // Crea el tablero de juego
  createBoard() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < 11; i++) {
      const row = [];
      for (let j = 0; j < 11; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        row.push(cell);
        board.appendChild(cell);
      }
      this.board.push(row);
    }
  }

  // Coloca al jugador en el tablero de juego
  placePlayer(x, y) {
    this.player = new Player(x, y);
    const playerCell = this.board[y][x];
    playerCell.classList.add("player");
  }

  // Coloca obstáculos aleatorios en el tablero de juego
  placeObstacles(numObstacles) {
    for (let i = 0; i < numObstacles; i++) {
      const x = Math.floor(Math.random() * 11);
      const y = Math.floor(Math.random() * 11);
      if (
        this.board[y][x].classList.contains("player") ||
        this.board[y][x].classList.contains("obstacle")
      ) {
        // Evita colocar obstáculos en la posición del jugador o donde ya hay un obstáculo
        i--;
      } else {
        this.obstacles.push(new Obstacle(x, y));
        const obstacleCell = this.board[y][x];
        obstacleCell.classList.add("obstacle");
      }
    }
  }

  // Maneja el movimiento del jugador
  handlePlayerMove(event) {
    if (!this.gameOver) {
      const key = event.key;
      const oldX = this.player.x;
      const oldY = this.player.y;

      if (key === "ArrowUp" && this.player.y > 0) {
        this.player.move(oldX, oldY - 1);
      } else if (key === "ArrowDown" && this.player.y < 10) {
        this.player.move(oldX, oldY + 1);
      } else if (key === "ArrowLeft" && this.player.x > 0) {
        this.player.move(oldX - 1, oldY);
      } else if (key === "ArrowRight" && this.player.x < 10) {
        this.player.move(oldX + 1, oldY);
      }

      const newCell = this.board[this.player.y][this.player.x];
      if (newCell.classList.contains("obstacle")) {
        // Si el jugador se mueve a una posición con un obstáculo, termina el juego
        this.gameOver = true;
        alert("Game Over");
      } else if (newCell.classList.contains("coin")) {
        // Si el jugador se mueve a una posición con una moneda
        this.player.increaseScore(10);
        this.score += 10;
        document.getElementById("score").textContent = this.score;
        newCell.classList.remove("coin"); // remueve la clase "coin" del elemento de la celda
      } 

      const playerCell = this.board[oldY][oldX];
      playerCell.classList.remove("player");
      newCell.classList.add("player");
    }
  }

  // Coloca monedas aleatorias en el tablero de juego
  placeCoins(numCoins) {
    for (let i = 0; i < numCoins; i++) {
      const x = Math.floor(Math.random() * 11);
      const y = Math.floor(Math.random() * 11);
      if (
        this.board[y][x].classList.contains("player") ||
        this.board[y][x].classList.contains("obstacle") ||
        this.board[y][x].classList.contains("coin")
      ) {
        // Evita colocar monedas en la posición del jugador, donde ya hay un obstáculo o donde ya hay una moneda
        i--;
      } else {
        const coinCell = this.board[y][x];
        coinCell.classList.add("coin");
        this.coins.push(coinCell);
      }
    }
  }

  // Inicia el juego
  startGame() {
    this.createBoard();
    this.placePlayer(5, 5);
    this.placeObstacles(15);
    this.placeCoins(10);
    document.addEventListener("keydown", this.handlePlayerMove.bind(this));
  }
}

// Crea una nueva instancia del juego y lo inicia
const bomberman = new Bomberman();
bomberman.startGame();

// Reinicia el juego
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    location.reload();
  });
