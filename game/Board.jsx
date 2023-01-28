import React from "react";
import Square from "./Square";
import "./Board.css";

const Board = ({ itemLocation, winnerLines, squares, onClick}) => {
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

    let reverseValue = ""
    if (index === itemLocation) reverseValue = "reverse"

    return (
      <Square
        winnerSquare={winnerSquare}
        item={reverseValue}
        squareValue={squares[index]}
        onClick={() => onClick(index)}
      />
    );
  };

  return (
    <>
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
    </>
  );
};

export default Board;
