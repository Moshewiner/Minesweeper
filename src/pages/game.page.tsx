import Board from '../components/board/board.component';
import React, { useState, useEffect } from 'react';
import './game.page.scss';

export const GameContext = React.createContext<{ flagCount: number, setFlagCount: (count: number) => void, isGameRunning: boolean }>({flagCount: 0, setFlagCount: () => {}, isGameRunning: false});

function Game() {
  const [colsCount, setColsCount] = useState(6);
  const [rowsCount, setRowsCount] = useState(6);
  const [minesCount, setMinesCount] = useState(3);
  const [boardProps, setBoardProps] = useState({
    colsCount,
    rowsCount,
    minesCount,
  });
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [flagCount, setFlagCount] = useState(minesCount);

  return (
    <GameContext.Provider value={{ flagCount, isGameRunning, setFlagCount }}>
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
        onChange={
          (e) => {
            setMinesCount(+e.target.value);
            setFlagCount(+e.target.value);
          }
        }
      />
      <button
        onClick={() => setBoardProps({ colsCount, rowsCount, minesCount })}
      >
        New Game
      </button>
      <div><span>Remaining Flags: {flagCount}</span></div>
      <Board
        colsCount={boardProps.colsCount}
        rowsCount={boardProps.rowsCount}
        mineCount={boardProps.minesCount}
      />
    </GameContext.Provider>
  );
}

export default Game;
