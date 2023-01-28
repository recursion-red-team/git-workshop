import React from 'react';
import "./ScoreBoard.css";
import { useState } from "react";

export const ScoreBoard = ({ result , winner }) => {
  // result == "NEXT PLAYER: X or Winner: X"
  // これから winner == "X or O"; 勝ちパターンが引数[1,4,7] or null

  // winner playerのカウント
  const [ scoreX, setScoreX ] = useState(0);
  const [ scoreY, setScoreY ] = useState(0);

  console.log("result --> " + result.substring(result.length-1));
  console.log("result(substring無し) --> " + result);
  // それぞれのwinnerのカウントしていく

  console.log("WINNER ====>>>> " + winner);

  // player毎に表示を切り替える


  return (
    <>
      <div className='scoreboard'>
        {result}
        <div className='totalScore'>
          {`COUNT : X = ${scoreX} / O = ${scoreY}`}
        </div>
      </div>
    </>
  )
}
