import Board from '../components/board/board.component';
import React, { useState } from 'react';
import './game.page.scss';

export const GameContext = React.createContext<{
  minesCount: number;
  remainingFlagsCount: number;
  setFlagCount: (count: number) => void;
  isGameRunning: boolean;
  setIsGameRunning: (isRunning: boolean) => void;
}>({
  remainingFlagsCount: 0,
  setFlagCount: () => {},
  isGameRunning: false,
  minesCount: 0,
  setIsGameRunning: () => {},
});

function Game() {
  const [colsCount, setColsCount] = useState(9);
  const [rowsCount, setRowsCount] = useState(9);
  const [minesCount, setMinesCount] = useState(3);
  const [boardProps, setBoardProps] = useState({
    colsCount,
    rowsCount,
    minesCount,
  });
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [remainingFlagsCount, setFlagCount] = useState(minesCount);
  const [boardId, setBoardId] = useState(0);

  return (
    <div className="game">
      <div className="heading">Minesweeper</div>
      <GameContext.Provider
        value={{
          remainingFlagsCount,
          isGameRunning,
          setFlagCount,
          minesCount,
          setIsGameRunning,
        }}
      >
        <div className="controls">
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
            onChange={(e) => {
              setMinesCount(+e.target.value);
              setFlagCount(+e.target.value);
            }}
          />
          <button
            onClick={() => {
              setBoardProps({ colsCount, rowsCount, minesCount });
              setIsGameRunning(true);
              setBoardId(boardId + 1);
            }}
          >
            New Game
          </button>
        </div>
        <div className="info">
          <span>Remaining Flags: {remainingFlagsCount}</span>
        </div>
        <Board
          colsCount={boardProps.colsCount}
          rowsCount={boardProps.rowsCount}
          mineCount={boardProps.minesCount}
          id={boardId}
        />
      </GameContext.Provider>
    </div>
  );
}

export default Game;
