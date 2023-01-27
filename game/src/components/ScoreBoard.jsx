import React from 'react';
import "./ScoreBoard.css";

export const ScoreBoard = ({result}) => {

  return (
    <>
      <div className='scoreboard'>
        {result}
      </div>
    </>
  )
}
