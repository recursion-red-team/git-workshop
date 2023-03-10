import React from "react";
import "./Square.css";

const Square = ({ item, winnerSquare, squareValue, onClick }) => {
	console.log(winnerSquare);
	let square = "square " + winnerSquare
	return (
      <button
				className={square}
				id={item}
				onClick={() => onClick()}
				>
				{squareValue}
			</button>
  );
};

export default Square;
