import { TileStatus } from "./tile.types";

export function toggleFlag(
    currentStatus: TileStatus,
    flagCount: number,
    setFlagCount: (count: number) => void
  ): TileStatus {
    if (currentStatus === TileStatus.Flag) {
      setFlagCount(flagCount + 1);
      return TileStatus.Hidden;
    }
    if (currentStatus === TileStatus.Hidden) {
      if (flagCount > 0) {
        setFlagCount(flagCount - 1);
        return TileStatus.Flag;
      } else {
        alert("You don't have any more flags to use");
      }
    }
  
    return currentStatus;
  }
  
  export function revealTile(
    currentState: TileStatus,
    numberOfRevealedTiles: number,
    setNumberOfRevealedTiles: (count: number) => void
  ): TileStatus {
    const options = {
      [TileStatus.Hidden]: TileStatus.Revealed,
    } as { [key in TileStatus]: TileStatus };
  
    if (options[currentState] && options[currentState] !== currentState) {
      setNumberOfRevealedTiles(numberOfRevealedTiles + 1);
      return options[currentState];
    }
    return currentState;
  }
  