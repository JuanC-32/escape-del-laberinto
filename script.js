const board = document.getElementById('board');
const rollBtn = document.getElementById('rollBtn');
const dice = document.getElementById('dice');
const message = document.getElementById('message');
const positionText = document.getElementById('position');

const totalCells = 64;
let playerPosition = 1;

const traps = [7, 14, 23, 31, 45, 58];
const boosts = [5, 12, 20, 37, 49, 54];
const mystery = [9, 18, 29, 40, 52, 60];

function createBoard() {
    board.innerHTML = '';

    for(let i = 1; i <= totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if(traps.includes(i)) {
          cell.classList.add('trap');
        } else if(boosts.includes(i)) {
          cell.classList.add('boost');
        } else if(mystery.includes(i)) {
          cell.classList.add('mystery');
        } else if(i === totalCells) {
          cell.classList.add('finish');
        } else {
          cell.classList.add('normal');
        }

        cell.innerHTML = `<span>${i}</span>`;

        if(i === playerPosition) {
          const player = document.createElement('div');
          player.classList.add('player');
          cell.appendChild(player);
        }

        board.appendChild(cell);
    }
}

function rollDice() {
    const value = Math.floor(Math.random() * 6) + 1;
    const diceFaces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    dice.textContent = diceFaces[value - 1];

    playerPosition += value;

    if(playerPosition > totalCells) {
      playerPosition = totalCells;
    }

    let text = `Sacaste un ${value}. `;

    if(traps.includes(playerPosition)) {
      playerPosition -= 3;
      text += '💀 Caíste en una trampa y retrocedes 3 casillas.';
    }
    
    else if(boosts.includes(playerPosition)) {
      playerPosition += 3;
      text += '🚀 Encontraste un boost y avanzas 3 casillas.';
    }

    else if(mystery.includes(playerPosition)) {
      const randomEffect = Math.random() > 0.5 ? 4 : -4;
      playerPosition += randomEffect;

      if(randomEffect > 0) {
        text += '✨ Casilla misteriosa: avanzas 4 casillas.';
      } else {
        text += '😵 Casilla misteriosa: retrocedes 4 casillas.';
      }
    }

    if(playerPosition < 1) {
      playerPosition = 1;
    }

    if(playerPosition >= totalCells) {
      playerPosition = totalCells;
      text = '🏆 ¡Ganaste! Escapaste del laberinto.';
      rollBtn.disabled = true;
      rollBtn.textContent = 'Juego terminado';
    }

    positionText.textContent = playerPosition;
    message.textContent = text;

    createBoard();
}

    rollBtn.addEventListener('click', rollDice);

    createBoard();