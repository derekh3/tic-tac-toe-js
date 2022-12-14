boardSize = 9;

const Gameboard = (function () {
  let gameBoard = [null, null, null, null, null, null, null, null, null];
  const getBoard = () => gameBoard;
  const addPiece = (piece, index) => gameBoard[index] = piece;
  const removeAllPieces = () => gameBoard = [null, null, null, null, null, null, null, null, null];
  return { getBoard, addPiece, removeAllPieces };
})();

const playerFactory = () => {

};

const Game = (function () {
  let turn = 1;
  let gameEnded = false;
  const initializeGame = () => {
    displayController.initializeDisplay();
    turn = 1;
  }
  const whoseTurn = () => {
    return (turn % 2 == 1) ? 'x' : 'o';
  };
  const switchTurn = () => {
    turn++;
  }
  const getTurn = () => turn;

  const attemptAddPiece = (e) => {
    boardIndex = Number(e.target.getAttribute("cellNumber")) - 1;
    if (Gameboard.getBoard()[boardIndex] === null && gameEnded === false) {
      Gameboard.addPiece(whoseTurn(), boardIndex);
      switchTurn();
      displayController.displayAllPieces();
      checkStatus();
    }


  }

  const checkStatus = () => {
    if (checkWin() || checkTie()) {
      displayController.announceEnd(checkWin(), checkTie());
      endGame();
    }
  }

  const checkRows = () => {
    let board = Gameboard.getBoard();
    for (let i = 1; i <= 9; i += 3) {
      if (board[i - 1] !== null && board[i - 1] === board[i] && board[i - 1] === board[i + 1]) {
        return board[i - 1];
      }
    }
    return false;
  };

  const checkColumns = () => {
    let board = Gameboard.getBoard();
    for (let i = 1; i <= 3; i++) {
      if (board[i - 1] !== null && board[i - 1] === board[i + 2] && board[i - 1] === board[i + 5]) {

        console.log("A column win to be sure")
        return board[i - 1];

      }
    }
    return false;
  };

  const checkDiagonals = () => {
    let board = Gameboard.getBoard();
    if (board[0] != null && board[0] === board[4] && board[0] === board[8]) {
      return board[0];
    }
    if (board[2] != null && board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }
    return false;
  };

  const checkWin = () => {
    let board = Gameboard.getBoard();
    return checkRows() || checkColumns() || checkDiagonals();

  }

  const checkTie = () => {
    let board = Gameboard.getBoard();
    return !board.includes(null) && !checkWin();
  }

  const endGame = () => {
    displayController.showNewGameButton();
    gameEnded = true;
  }

  const resetGame = () => {
    Gameboard.removeAllPieces();
    initializeGame();
    gameEnded = false;
  };

  return { initializeGame, whoseTurn, attemptAddPiece, resetGame, gameEnded };
})();

const displayController = (function (doc) {

  const cellArray = [];
  const defineElements = () => {
    for (i = 0; i < boardSize; i++) {
      let cellElement = doc.querySelector(`.c${i + 1}`);
      cellElement.setAttribute('cellNumber', `${i + 1}`);
      cellArray.push(cellElement);
    }
  };

  const defineClickListeners = () => {

    for (i = 0; i < boardSize; i++) {
      cellArray[i].onclick = Game.attemptAddPiece;
    }

    const nameChangeBtns = doc.querySelectorAll(".name-change");
    for (let btn of nameChangeBtns) {
      btn.onclick = changeName;
    }

  };

  const displayAllPieces = () => {
    for (i = 0; i < boardSize; i++) {
      cellArray[i].innerText = Gameboard.getBoard()[i];
    }
  }

  const initializeDisplay = () => {
    defineElements();
    displayAllPieces();
    defineClickListeners();
  }

  const changeName = (e) => {
    playerNumber = e.target.getAttribute('data-player');
    playerLabel = doc.querySelector(`.player${playerNumber}-name`);
    playerLabel.textContent = prompt(`New name for player ${playerNumber}?`);
  }

  const announceEnd = (winningPiece, tieStatus) => {
    const status = doc.createElement('p');
    status.classList.add('status');
    const mainContainer = doc.querySelector('.main-container');
    console.log(mainContainer);
    if (winningPiece) {
      status.textContent = `${winningPiece} wins the game!`;
    } else if (tieStatus) {
      status.textContent = "Tie game!";
    }
    mainContainer.appendChild(status);


  }

  const showNewGameButton = () => {
    const newGameBtn = doc.createElement('button');
    const status = doc.querySelector('.status')
    newGameBtn.textContent = 'New Game'

    newGameBtn.onclick = (e) => {
      Game.resetGame();
      e.target.remove();
      status.remove();
    };
    const mainContainer = doc.querySelector('.main-container');
    mainContainer.appendChild(newGameBtn);
  }

  return { initializeDisplay, displayAllPieces, announceEnd, showNewGameButton };

})(document);

Game.initializeGame();