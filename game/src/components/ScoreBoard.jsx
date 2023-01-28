import React from 'react';
import "./ScoreBoard.css";
// import { useState } from "react";

export const ScoreBoard = ({ result }) => {

  // Gameコンポーネントからpropsでwinneを引数として受け取り、勝者をカウントする予定だったが、以下のエラーにより解決せず
  //  react-dom.development.js:16317 Uncaught Error: Too many re-renders.
  // React limits the number of renders to prevent an infinite loop.
  //  at renderWithHooks (react-dom.development.js:16317:1)

  // winner playerのカウント
  // const [ scoreX, setScoreX ] = useState(0);
  // const [ scoreY, setScoreY ] = useState(0);

  // if(winner !== null){
  //   if(win === "X"){
  //     setScoreX(scoreX +1);
  //   } else if(win == "O") {
  //     setScoreY(scoreY + 1);
  //   } else {
  //     return;
  //   }
  // }


  return (
    <>
      <div className='scoreboard'>
        {result}
        {/* <div className='totalScore'>
          {`COUNT : X = ${scoreX} / O = ${scoreY}`}
        </div> */}
      </div>
    </>
  )
}
