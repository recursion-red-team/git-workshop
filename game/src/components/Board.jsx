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
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

export default Board;
