import React, { useState } from "react";
import Board from "./Board";
import "./Game.css";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [disabledClick, setDisabledClick] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const randomLocation = Math.floor(Math.random() * 9);
  const [reverseLocation, setReverseLocation] = useState(randomLocation);
  const MAX_PLAY_COUNT = 5;
  
  const jumpTo = (step) => {
    if (step === 0){
      addHidden();
      setReverseLocation(randomLocation);
      console.log("randomLocation is " + reverseLocation)
    };
    setPlayCount(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : `Restart`;
    let visibility = "";
    let restart = "";

    if (move === 0){
      restart = "restart";
    }else visibility = "hidden";

    return (
      <li key={move}
        className={visibility}
      >
        <button
          onClick={() => jumpTo(move)}
          id={restart}
        >
        {desc}
        </button>
      </li>
    );
  });
  
  /**
   * マス目クリック時
   * @param {int} index
   */
  const handleClick = (index) => {
    if (index === reverseLocation){
      playerClickAction(index);
      reverse();
    } else {
      playerClickAction(index);
    }
  };
  
  const playerClickAction = (index) => {
    setDisabledClick(true);
    const historyCurrent = history.slice(0, playCount + 1);
    const current = historyCurrent[historyCurrent.length - 1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[index]) {
      setDisabledClick(false);
      return;
    }
    squares[index] = xIsNext ? "X" : "O";
    
    setPlayCount(historyCurrent.length);
    setHistory([...historyCurrent, { squares }]);
    setXIsNext(!xIsNext);
    
    setTimeout(() => {
      cpuAction(squares);
      setDisabledClick(false);
    }, 1000);
  };
  
  const reverse = () => {
    const historyCurrent = history.slice(0, playCount + 1);
    const current = historyCurrent[historyCurrent.length - 1];
    const squares = current.squares.slice();
    let reversedSquares = squares;
    
    console.log(squares);
    reversedSquares = squares.map((value) => {
      if (value === null) {
        return value
      } else if (value === "X"){
        return value = "O"
      } else {
        return "X"
      }
    });
    // setPlayCount(historyCurrent.length);
    // setHistory([...historyCurrent, { reversedSquares }]);
    console.log("reversed!");
    console.log(reversedSquares);
  };  
  
  const board = document.getElementById("board");
  /**
   * 勝敗が決したのち、タイムトラベルボタンを表示
   * Restartするとタイムトラベルボタンを非表示
  */
 const removeHidden = () => {
   board.classList.add('disabled');
   const buttonList = document.getElementById("buttonList");
   const children = buttonList.children;
   for (let i = 0; i < children.length; i++){
      children[i].classList.remove('hidden');
      console.log(children[i]);
    };
  };
  
  const addHidden = () => {
    board.classList.remove('disabled');
    const buttonList = document.getElementById("buttonList");
    const children = buttonList.children;
    for (let i = 0; i < children.length; i++){
      children[i].classList.add('hidden');
      console.log(children[i]);
    };
  }
  
  const cpuAction = (squares) => {
    if (calculateWinner(squares)) return;
    const currentHistory = history.slice(0, playCount + 1);
    
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
    
    setHistory([...currentHistory, { squares }]);
    setXIsNext(xIsNext);
    if (action_hand === reverseLocation){
      reverse();
    };
  };

  /**
   * 現在の盤面
   */
  const current = history[playCount];

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
         return [a, b ,c];
        }
    }
    return null;
  };

  /**
   * 勝者/次のプレイヤーを表示
   * @returns {string}
   */
  const winner = calculateWinner(current.squares)
  console.log(winner);
  let result = "";
  if (winner) {
    removeHidden();
    const winnerStatus = current.squares[winner[0]]
    result = "勝者: " + winnerStatus;
  } else if (playCount === MAX_PLAY_COUNT) {
    removeHidden();
    result = "引き分けです";
  } else {
    result = "次のプレイヤー: " + (xIsNext ? "X" : "O");
  };

  return (

<div className={"game " + (disabledClick ? "disabled" : "")}>
      <div className="game-board" id="board">
        <div className="display">{result}</div>
        <Board
          winnerLines={winner}
          itemLocation={reverseLocation}
          squares={current.squares}
          onClick={index => handleClick(index)}
        />
      </div>
      <div className="game-info">
          <ul id="buttonList">{moves}</ul>
      </div>
    </div>
  );
};

export default Game;
