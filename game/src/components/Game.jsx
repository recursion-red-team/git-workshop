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
   * タイムトラベルボタン
   */
  const jumpTo = (step) => {
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
          id={restart}
        >
            <button 
              onClick={() => jumpTo(move)}
            > 
            {desc} 
            </button>
        </li>
    );
  });

  /**
   * 勝敗が決したのち、タイムトラベルボタンを表示
   * Restartするとタイムトラベルボタンを非表示
   */
  const toggleHidden = () => {
    // ulを取得
    const buttonList = document.getElementById("buttonList");
    console.log(buttonList);
    // 子要素を取得
    const children = buttonList.children;
    console.log(children);
    // 子要素のクラスをtoggle()
    for (let i = 0; i < children.length; i++){
      children[i].classList.remove('hidden');
      console.log(children[i]);
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
         return resultSquares[a];
        }
    }
    return null;
  };
  
  /**
   * 勝者/次のプレイヤーを表示
   * @returns {string}
   */
    const winner = calculateWinner(current.squares);
    let result = "";
    if (winner) {
      toggleHidden();
      result = "勝者: " + winner;
    } else if (playCount === MAX_PLAY_COUNT) {
      toggleHidden();
      result = "引き分けです";
    } else {
      result = "次のプレイヤー: " + (xIsNext ? "X" : "O");
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
            <div>{result}</div>
            <ul id="buttonList">{moves}</ul>
        </div>
    </div>
  )
};

export default Game;
