import React, { useState, useEffect, useCallback, useContext } from 'react';
import './board.component.scss';
import TileContainer from '../tiles/tile.container';
import { twoDimentionalIndexToOne } from '../../services/array-utils/array-utils.service';
import { createBoard, toggleFlag, revealTile, revealEmptyTiles } from '../../services/board/board.service';
import { TileStatus, ClickType } from '../tiles/tile.component';
import { Tile, TileType } from '../../services/board/board.types';
import { FixedSizeGrid as Grid } from 'react-window';
import { GameContext } from './../../pages/game.page';

function Board(props: { colsCount: number; rowsCount: number; mineCount: number; id: number }) {
  const { isGameRunning, setIsGameRunning, remainingFlagsCount, setFlagCount, minesCount } = useContext(GameContext);
  let [board, setBoard] = useState<Tile[]>([]);
  let [revealedTilesCount, setNumberOfRevealedTiles] = useState(0);

  const onMineClick = useCallback(
    (clickType: ClickType, tileStatus: TileStatus, position: number) => {
      if (!isGameRunning) {
        return;
      }
      if (board.length !== props.colsCount * props.rowsCount) {
      } else if (clickType === ClickType.Primary && tileStatus === TileStatus.Hidden) {
        board.length &&
          board.forEach((tile: Tile) => {
            if (tile.type === TileType.Mine) {
              tile.status = TileStatus.Revealed;
            }
          });
        setTimeout(() => alert('You have lost!'), 0);
        setIsGameRunning(false);
      } else if (clickType === ClickType.Secondary) {
        board[position].status = toggleFlag(tileStatus, remainingFlagsCount, setFlagCount);
      }
      setBoard([...board]);
    },
    [board, remainingFlagsCount, isGameRunning]
  );

  const onNumberTileClick = useCallback(
    (clickType: ClickType, tileStatus: TileStatus, position: number) => {
      if (!isGameRunning) {
        return;
      }
      if (board.length !== props.colsCount * props.rowsCount) {
      } else if (clickType === ClickType.Primary) {
        const n = revealTile(tileStatus, revealedTilesCount, setNumberOfRevealedTiles);
        board[position].status = n;

        if (board[position].value === 0) {
          revealEmptyTiles(
            board,
            position,
            props.colsCount,
            props.rowsCount,
            revealedTilesCount,
            setNumberOfRevealedTiles
          );
        }
      } else if (clickType === ClickType.Secondary) {
        board[position].status = toggleFlag(board[position].status, remainingFlagsCount, setFlagCount);
      }
      setBoard([...board]);
    },
    [board, props.colsCount, props.rowsCount, revealedTilesCount, isGameRunning]
  );

  useEffect(() => {
    setBoard(createBoard(props.colsCount, props.rowsCount, props.mineCount));
  }, [props.colsCount, props.rowsCount, props.mineCount, props.id]);

  useEffect(() => {
    checkWin(props.colsCount, props.rowsCount, revealedTilesCount, minesCount, remainingFlagsCount, setIsGameRunning);
  }, [props.colsCount, props.rowsCount, revealedTilesCount, minesCount, remainingFlagsCount, setIsGameRunning]);

  useEffect(() => {
    setNumberOfRevealedTiles(0);
    setFlagCount(minesCount);
  }, [props.id]);

  return board.length > 0 ? (
    <Grid
      columnCount={props.colsCount}
      rowCount={props.rowsCount}
      columnWidth={50}
      width={500}
      height={500}
      rowHeight={50}
    >
      {({ columnIndex, rowIndex, style }) => {
        return createCell(
          style,
          twoDimentionalIndexToOne(columnIndex, rowIndex, props.colsCount),
          board,
          onMineClick,
          onNumberTileClick
        );
      }}
    </Grid>
  ) : null;
}

function createCell(
  style: object,
  position: number,
  board: Tile[],
  onMineClick: (clickType: ClickType, tileStatus: TileStatus, position: number) => void,
  onNumberTileClick: (clickType: ClickType, tileStatus: TileStatus, position: number) => void
) {
  const boardItem = board[position];
  if (!boardItem) return null;

  let valueProp: any = {};
  if (boardItem.type !== TileType.Mine) {
    valueProp.value = boardItem.value;
  }
  return (
    <TileContainer
      onClick={boardItem.type === TileType.Mine ? onMineClick : onNumberTileClick}
      type={boardItem.type}
      position={position}
      key={position}
      {...valueProp}
      style={style}
      status={boardItem.status}
    />
  );
}

function checkWin(
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

export default Board;
