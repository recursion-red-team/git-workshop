import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squareList, setSquareList] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playCount, setPlayCount] = useState(0);

  const MAX_PLAY_COUNT = 9;

  /**
   * マス目クリック時
   * @param {int} index
   */
  const handleClick = (index) => {
    const squares = squareList.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    setPlayCount((previousCount) => previousCount + 1);

    squares[index] = xIsNext ? "X" : "O";

    setSquareList(squares);
    setXIsNext(!xIsNext);
  };

  /**
   * マス目を表示する
   * @param {int} index
   * @returns {Function}
   */
  const renderSquare = (index) => {
    return (
      <Square
        squareValue={squareList[index]}
        onClick={() => handleClick(index)}
      />
    );
  };

  /**
   * 勝者/次のプレイヤーを表示
   * @returns {string}
   */
  const getWinner = () => {
    const winner = calculateWinner(squareList);
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
  const resetAll = () => {
    setSquareList(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div>
      <div className="status">{getWinner()}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={() => resetAll()}>もう一度チャレンジ</button>
    </div>
  );
};

export default Board;
