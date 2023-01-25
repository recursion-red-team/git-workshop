import React, { useEffect, useState } from "react";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [moves, setMoves] = useState(true);
  const [disabledClick, setDisabledClick] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const MAX_PLAY_COUNT = 5;

  useEffect(() => {
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}> {desc} </button>
        </li>
      );
    });
    setMoves(moves);
  }, [history]);

  /**
   * マス目クリック時
   * @param {int} index
   */
  const handleClick = (index) => {
    setDisabledClick(true);

    const historyCurrent = history.slice(0, playCount + 1);
    const current = historyCurrent[historyCurrent.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = xIsNext ? "X" : "O";

    setPlayCount(historyCurrent.length);
    setHistory([...historyCurrent, { squares }]);

    setTimeout(() => {
      cpuAction(squares);
      setDisabledClick(false);
    }, 1000);
  };

  /**
   * タイムトラベル
   */
  const jumpTo = (step) => {
    setPlayCount(step);
    setXIsNext(step % 2 === 0);
  };

  const cpuAction = (squares) => {
    if (calculateWinner(squares)) return;
    const currentHistory = history.slice(0, playCount + 2);

    const possible_hands = [];
    let hand = squares.indexOf(null);
    while (hand !== -1) {
      possible_hands.push(hand);
      hand = squares.indexOf(null, hand + 1);
    }

    if (possible_hands.length === 0) return;

    const action_hand = possible_hands[Math.floor(Math.random() * possible_hands.length)];
    const cpuStatus = !xIsNext;
    squares[action_hand] = cpuStatus ? "X" : "O";
    currentHistory[history.length - 1].squares = squares;

    setHistory([...currentHistory, { squares }]);
    setXIsNext(xIsNext);
  };

  /**
   * 勝者/次のプレイヤーを表示
   * @returns {string}
   */
  const getWinner = () => {
    const winner = calculateWinner(history[playCount].squares);
    if (winner) {
      return "勝者: " + winner;
    } else if (playCount === MAX_PLAY_COUNT) {
      return "引き分けです";
    } else {
      return "次のプレイヤー: " + (xIsNext ? "あなた" : "CPU");
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

  const current = history[playCount];

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
    <div className={"game " + (disabledClick ? "disabled" : "")}>
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(index) => handleClick(index)}
        />
      </div>
      <div className="game-info">
        <div>{getWinner()}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
