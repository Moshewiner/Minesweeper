import React from 'react';
import MineTile from './mine-tile/mine-tile.component';
import NumberTile from './number-tile/number-tile.component';
import { ClickType, TileStatus, TileType } from '../../services/board/tile.types';
import Tile from './abstract-tile/tile.component';

type MineTileProps = {
  type: TileType.Mine;
};

type NumberTileProps = {
  type: TileType.NumberTile;
  value: number;
};

type TileContainerPropsType = (MineTileProps | NumberTileProps) & {
  onClick: (clickType: ClickType, tileStatus: TileStatus, position: number) => void;
  status: TileStatus;
  position: number;
  style: object;
};

function TileContainer(props: TileContainerPropsType) {
  if (props.type === TileType.Mine) {
    return <MineTile
      style={props.style}
      status={props.status}
      onClick={
        (clickType, tileStatus) => props.onClick(clickType, tileStatus, props.position)
      } />;
  }
  else if (props.type === TileType.NumberTile) {
    return <NumberTile
      style={props.style}
      status={props.status}
      onClick={(clickType, tileStatus) => props.onClick(clickType, tileStatus, props.position)}
      value={(props as NumberTileProps).value} />;
  }

  const currentProps: TileContainerPropsType = props as TileContainerPropsType;
  return (
    <Tile
      {...currentProps}
      onClick={(clickType, tileStatus) => currentProps.onClick(clickType, tileStatus, currentProps.position)}
    >
      Error!
    </Tile>
  );
}

export default TileContainer;
