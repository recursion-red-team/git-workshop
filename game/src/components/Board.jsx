import React from "react";
import Square from "./Square";
import "./Board.css";

const Board = ({ winnerLines, squares, onClick}) => {
  /**
   * マス目を表示する
   * @param {int} index
   * @returns {Function}
   */
  if (winnerLines) console.log(winnerLines);
  const renderSquare = (index) => {
    let winnerSquare = "";
    if (winnerLines){
      for (let i = 0; i < winnerLines.length; i++){
        if (index === winnerLines[i]) winnerSquare = "winner";
      };
    }

    return (
      <Square
        winnerSquare={winnerSquare}
        squareValue={squares[index]}
        onClick={() => onClick(index)}
      />
    );
  };

  return (
    <>
      <div className="board-row">
        <div className="item">
          {renderSquare(0)}
        </div>
        <div className="item">
          {renderSquare(1)}
        </div>
        <div className="item">
          {renderSquare(2)}
        </div>
        <div className="item">
          {renderSquare(3)}
        </div>
        <div className="item">
          {renderSquare(4)}
        </div>
        <div className="item">
          {renderSquare(5)}
        </div>
        <div className="item">
          {renderSquare(6)}
        </div>
        <div className="item">
          {renderSquare(7)}
        </div>
        <div className="item">
          {renderSquare(8)}
        </div>
      </div>
    </>
  );
};

export default Board;
