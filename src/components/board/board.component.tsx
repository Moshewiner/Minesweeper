import React from 'react';
import './board.component.scss';
import TileContainer from '../tiles/tile.container';
import { twoDimentionalIndexToOne } from '../../services/array-utils/array-utils.service';
import { FixedSizeGrid as Grid } from 'react-window';
import { GameBoard } from '../../services/board/board.types';
import { ClickType, TileStatus, Tile, TileType } from '../../services/board/tile.types';

function Board(props: {
  board: GameBoard,
  colsCount: number;
  rowsCount: number;
  mineCount: number;
  onClick: (clickType: ClickType, tileStatus: TileStatus, position: number) => void;
}) {

  return props.board.length > 0 ? (
    <Grid
      columnCount={props.colsCount}
      rowCount={props.rowsCount}
      columnWidth={50}
      width={500}
      height={500}
      rowHeight={50}
    >
      {({ columnIndex, rowIndex, style }) => {
        return createTile(
          style,
          twoDimentionalIndexToOne(columnIndex, rowIndex, props.colsCount),
          props.board,
          props.onClick,
        );
      }}
    </Grid>
  ) : null;
}

function createTile(
  style: object,
  position: number,
  board: Tile[],
  onClick: (clickType: ClickType, tileStatus: TileStatus, position: number) => void,
) {
  const tile = board[position];
  if (!tile) return null;

  let valueProp: any = {};
  if (tile.type !== TileType.Mine) {
    valueProp.value = tile.value;
  }
  return (
    <TileContainer
      onClick={onClick}
      type={tile.type}
      position={position}
      key={position}
      {...valueProp}
      style={style}
      status={tile.status}
    />
  );
}

export default Board;
