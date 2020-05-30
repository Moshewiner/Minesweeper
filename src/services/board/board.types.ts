import { Tile, TileType, TileStatus } from './tile.types';



export const DEFAULT_MINE_TILE: Tile = {
  type: TileType.Mine,
  status: TileStatus.Hidden,
  value: -1,
};
export const DEFAULT_NUMBER_TILE: Tile = {
  type: TileType.NumberTile,
  status: TileStatus.Hidden,
  value: 0,
};

export type GameBoard = Tile[];