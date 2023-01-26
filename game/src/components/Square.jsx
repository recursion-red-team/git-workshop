import React from "react";
import "./Square.css";

const Square = ({winnerSquare, squareValue, onClick}) => {
	console.log(winnerSquare);
	let square = "square " + winnerSquare
	return (
      <button
				className={square}
				onClick={() => onClick()}
				>
				{squareValue}
			</button>
  );
};

export default Square;
