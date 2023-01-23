import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([
    {
        squares: Array(9).fill(null)
    }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [playCount, setPlayCount] = useState(0);

  const MAX_PLAY_COUNT = 9;

  /**
   * マス目クリック時
   * @param {int} index
   */
  const handleClick = (index) => {
    const historyCurrent = history.slice(0, playCount +1);
    const current = historyCurrent[historyCurrent.length -1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = xIsNext ? "X" : "O";
    
    setPlayCount(historyCurrent.length);
    setHistory([...historyCurrent, {squares}]);
    setXIsNext(!xIsNext);
  };

  /**
   * タイムトラベル
   */
  const jumpTo = (step) => {
    setPlayCount(step);
    setXIsNext(step % 2 === 0);
  };
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : `Restart`;
    let visibility = ""
    if (move === 0)visibility = "visible";
    else visibility = "hidden";
    return (
        <li key={move}>
            <button 
              className={visibility}
              onClick={() => jumpTo(move)}
            > 
            {desc} 
            </button>
        </li>
    );
  });

  const current = history[playCount];

  /**
   * 勝者/次のプレイヤーを表示
   * @returns {string}
   */
   const getWinner = () => {
    const winner = calculateWinner(current.squares);
    if (winner) {
      return "勝者: " + winner;
    } else if (playCount === MAX_PLAY_COUNT) {
      return "引き分けです";
    } else {
      return "次のプレイヤー: " + (xIsNext ? "X" : "O");
    }
   };

  /**
   * 勝敗を計算する
   * @param {array} resultSquares
   * @returns {string|null}
   */
   const calculateWinner = (resultSquares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
     const [a, b, c] = lines[i];
     if (
       resultSquares[a] &&
       resultSquares[a] === resultSquares[b] &&
       resultSquares[a] === resultSquares[c]
     ) {
       return resultSquares[a];
     }
    }
    return null;
   };


  //　全てを初期化する
  //const resetAll = () => {
  //  setHistory(
  //      {
  //          squares: Array(9).fill(null)
  //      }
  //  );
  //  setXIsNext(true);
  //};

  return (
    <div className="game">
        <div className="game-board">
            <Board squares={current.squares} onClick={index => handleClick(index)} />
        </div>
        <div className="game-info">
            <div>{getWinner()}</div>
            <ul>{moves}</ul>
        </div>
    </div>
  )
};

export default Game;
