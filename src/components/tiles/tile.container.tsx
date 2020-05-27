import React from 'react';
import MineTile from './mine-tile/mine-tile.component';
import NumberTile from './number-tile/number-tile.component';
import Tile,{ TileStatus, ClickType } from './tile.component';

type MineTileType = {
    type: "Mine",
}

type NumberTileType = {
    type: "NumberTileType",
    value: number;
}

type TileContainerPropsType = (MineTileType | NumberTileType) & {
    onClick: (clickType: ClickType, tileStatus: TileStatus, position: number) => void,
    status: TileStatus,
    position: number
};

function TileContainer(props: TileContainerPropsType) {
    return (
        <Tile status={props.status} onClick={(clickType, tileStatus) => props.onClick(clickType, tileStatus, props.position)}>
            {
                props.type === 'Mine' ? <MineTile /> : <NumberTile value={(props as NumberTileType).value} />
            }
        </Tile>
    );
}

export default TileContainer;
