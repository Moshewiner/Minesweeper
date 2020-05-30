import React from "react";

export const GameContext = React.createContext<{
    minesCount: number;
    remainingFlagsCount: number;
    setFlagCount: (count: number) => void;
    isGameRunning: boolean;
    setIsGameRunning: (isRunning: boolean) => void;
    revealedTilesCount: number;
    setNumberOfRevealedTiles: (count: number) => void;
  }>({
    remainingFlagsCount: 0,
    setFlagCount: () => { },
    isGameRunning: false,
    minesCount: 0,
    setIsGameRunning: () => { },
    revealedTilesCount: 0,
    setNumberOfRevealedTiles: () => { }
  });
  