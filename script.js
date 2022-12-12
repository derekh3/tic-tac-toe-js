boardSize = 9;

const Gameboard = (function () {
  let gameBoard = [null, null, null, null, null, null, null, null, null];
  const getBoard = () => gameBoard;
  const addPiece = (piece, index) => gameBoard[index] = piece;
  return { getBoard, addPiece };
})();

const playerFactory = () => {

};

const Game = (function () {
  let turn = 1;
  const initializeGame = () => {
    displayController.initializeDisplay();
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
    if (Gameboard.getBoard()[boardIndex] === null) {
      Gameboard.addPiece(whoseTurn(), boardIndex);
      switchTurn();
      displayController.displayAllPieces();
    }
    console.log(boardIndex);
  }

  return { initializeGame, whoseTurn, attemptAddPiece };
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

  return { initializeDisplay, displayAllPieces };

})(document);

Game.initializeGame();