
export function checkWin(
    colsCount: number,
    rowsCount: number,
    revealedTilesCount: number,
    minesCount: number,
    remainingFlagsCount: number,
    setIsGameRunning: (isRunning: boolean) => void
  ) {
    if (colsCount * rowsCount - minesCount === revealedTilesCount && remainingFlagsCount === 0) {
      alert('You win!');
      setIsGameRunning(false);
    }
  }
  