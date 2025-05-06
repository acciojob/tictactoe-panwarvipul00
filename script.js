//your JS code here. If required.
const submitBtn = document.getElementById('submit');
    const board = document.querySelector('.board');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let player1 = '';
    let player2 = '';
    let gameActive = true;

    const winningCombinations = [
      [1,2,3], [4,5,6], [7,8,9],
      [1,4,7], [2,5,8], [3,6,9],
      [1,5,9], [3,5,7]
    ];

    function checkWin() {
      return winningCombinations.some(combination => {
        return combination.every(id => {
          const cell = document.getElementById(id);
          return cell.textContent === currentPlayer;
        });
      });
    }

    function handleClick(e) {
      if (!gameActive) return;

      const cell = e.target;
      if (cell.textContent !== '') return;

      cell.textContent = currentPlayer;

      if (checkWin()) {
        const winner = currentPlayer === 'X' ? player1 : player2;
        messageDiv.textContent = `${winner}, congratulations you won!`;
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      const nextPlayer = currentPlayer === 'X' ? player1 : player2;
      messageDiv.textContent = `${nextPlayer}, you're up`;
    }

    cells.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });

    submitBtn.addEventListener('click', () => {
      player1 = document.getElementById('player-1').value.trim();
      player2 = document.getElementById('player-2').value.trim();

      if (!player1 || !player2) {
        alert('Please enter both player names!');
        return;
      }

      document.querySelector('.input-section').style.display = 'none';
      board.style.display = 'block';
      messageDiv.textContent = `${player1}, you're up`;
    });