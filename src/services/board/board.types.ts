import { TileStatus } from '../../components/tiles/tile.component';

export enum TileType {
  Mine = 'Mine',
  NumberTile = 'NumberTile',
}

export type Tile = {
  type: TileType;
  status: TileStatus;
  value: number;
};

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
