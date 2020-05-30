import React, { useState } from 'react';
import './game.page.scss';
import Game from '../components/game/game.component';
import { GameContext } from '../services/game/game.context';

function GamePage() {
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
  let [revealedTilesCount, setNumberOfRevealedTiles] = useState(0);
  const [gameId, setGameId] = useState(0);


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
          revealedTilesCount,
          setNumberOfRevealedTiles
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
              setNumberOfRevealedTiles(0);
              setFlagCount(minesCount);
              setGameId(gameId+1);
            }}
          >
            New Game
          </button>
        </div>
        <div className="info">
          <span>Remaining Flags: {remainingFlagsCount}</span>
        </div>
        <Game
          colsCount={boardProps.colsCount}
          rowsCount={boardProps.rowsCount}
          minesCount={boardProps.minesCount}
          key={gameId}
        />
      </GameContext.Provider>
    </div>
  );
}

export default GamePage;
