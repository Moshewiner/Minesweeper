import Board from '../components/board/board.component';
import React, { useState } from 'react';
import './game.page.scss';

function Game() {
  const [colsCount, setColsCount] = useState(6);
  const [rowsCount, setRowsCount] = useState(6);
  const [minesCount, setMinesCount] = useState(3);
  const [boardProps, setBoardProps] = useState({
    colsCount,
    rowsCount,
    minesCount,
  });

  return (
    <>
      <input
        value={colsCount}
        type="number"
        placeholder="Number of columns"
        onChange={(e) => setColsCount(+e.target.value)}
      />
      <input
        value={rowsCount}
        type="number"
        placeholder="Number of rows"
        onChange={(e) => setRowsCount(+e.target.value)}
      />
      <input
        value={minesCount}
        type="number"
        placeholder="Number of mines"
        onChange={(e) => setMinesCount(+e.target.value)}
      />
      <button
        onClick={() => setBoardProps({ colsCount, rowsCount, minesCount })}
      >
        New Game
      </button>
      <Board
        colsCount={boardProps.colsCount}
        rowsCount={boardProps.rowsCount}
        mineCount={boardProps.minesCount}
      />
    </>
  );
}

export default Game;
