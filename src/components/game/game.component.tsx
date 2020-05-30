import { useState, useEffect, useContext, useCallback } from "react";
import { createBoard, revealEmptyTiles } from "../../services/board/board.service";
import { GameBoard } from "../../services/board/board.types";
import Board from "../board/board.component";
import React from "react";
import { GameContext } from "../../pages/game.page";
import { Tile, ClickType, TileStatus, TileType } from "../../services/board/tile.types";
import { toggleFlag, revealTile } from "../../services/board/tile.service";
import { checkWin } from "../../services/game-handler/game-handler.service";

function Game(props: { colsCount: number; rowsCount: number; minesCount: number; }) {
  let [gameBoard, setBoard] = useState<GameBoard>([]);
  const [boardId, setBoardId] = useState(0);


  useEffect(() => {
    setBoard(createBoard(props.colsCount, props.rowsCount, props.minesCount));
  }, [props.colsCount, props.rowsCount, props.minesCount, boardId]);
  const { isGameRunning, setIsGameRunning, remainingFlagsCount, setFlagCount, minesCount } = useContext(GameContext);
  let [revealedTilesCount, setNumberOfRevealedTiles] = useState(0);

  const onMineClick = useCallback(
    (clickType: ClickType, tileStatus: TileStatus, position: number) => {
      if (!isGameRunning) {
        return;
      }
      if (clickType === ClickType.Primary && tileStatus === TileStatus.Hidden) {
        gameBoard.length && gameBoard.forEach((tile: Tile) => {
          if (tile.type === TileType.Mine) {
            tile.status = TileStatus.Revealed;
          }
        });
        setTimeout(() => alert('You have lost!'), 0);
        setIsGameRunning(false);
      } else if (clickType === ClickType.Secondary) {
        gameBoard[position].status = toggleFlag(tileStatus, remainingFlagsCount, setFlagCount);
      }
      setBoard([...gameBoard]);
    },
    [gameBoard, remainingFlagsCount, isGameRunning]
  );

  const onNumberTileClick = useCallback(
    (clickType: ClickType, tileStatus: TileStatus, position: number) => {
      if (!isGameRunning) {
        return;
      }
      if (clickType === ClickType.Primary) {
        gameBoard[position].status = revealTile(tileStatus, revealedTilesCount, setNumberOfRevealedTiles);;

        if (gameBoard[position].value === 0) {
          revealEmptyTiles(
            gameBoard,
            position,
            props.colsCount,
            props.rowsCount,
            revealedTilesCount,
            setNumberOfRevealedTiles
          );
        }
      } else if (clickType === ClickType.Secondary) {
        gameBoard[position].status = toggleFlag(gameBoard[position].status, remainingFlagsCount, setFlagCount);
      }
      setBoard([...gameBoard]);
    },
    [gameBoard, props.colsCount, props.rowsCount, revealedTilesCount, isGameRunning]
  );

  useEffect(() => {
    checkWin(props.colsCount, props.rowsCount, revealedTilesCount, minesCount, remainingFlagsCount, setIsGameRunning);
  }, [props.colsCount, props.rowsCount, revealedTilesCount, minesCount, remainingFlagsCount, setIsGameRunning]);

  useEffect(() => {
    setNumberOfRevealedTiles(0);
    setFlagCount(minesCount);
  }, [boardId]);

  return (
    <Board
      onClick={
        (clickType: ClickType, tileStatus: TileStatus, position: number) => {
          if (gameBoard[position].type === TileType.Mine) {
            onMineClick(clickType, tileStatus, position);
          }
          else {
            onNumberTileClick(clickType, tileStatus, position);
          }
        }
      }
      board={gameBoard}
      colsCount={props.colsCount}
      rowsCount={props.rowsCount}
      mineCount={props.minesCount}
      key={boardId}
    />
  );
}



export default Game;