import React, { useState } from 'react';
import MineTile from './mine/mine-tile.component';
import NumberTile from './number/number-tile.component';
import Tile, { TileStatus, ClickType } from './base-tile/base-tile.component';

interface Bomb {
    type: "Bomb",
}

//TODO: find better name
interface Number {
    type: "Number",
    value: number;
}


function TileContainer(props: Bomb | Number) {

    let [status, setStatus]: [TileStatus, any] = useState(TileStatus.Hidden);

    return (
        <Tile
            status={status}
            onClick={
                (clickType: ClickType, tileType: TileStatus) => {
                    console.log(ClickType[clickType], tileType);
                    setStatus(toggleFlag(status));
                }
            }
        >
            {
                props.type === 'Bomb' ? <MineTile /> : <NumberTile value={(props as Number).value} />
            }
        </Tile>
    );
}

function toggleFlag(currentState: TileStatus): TileStatus {
    const options = {
        [TileStatus.Flag]: TileStatus.Hidden,
        [TileStatus.Hidden]: TileStatus.Revealed,
    } as { [key in TileStatus]: TileStatus }

    return options[currentState] || TileStatus.Hidden;
}

function toggleTile(currentState: TileStatus): TileStatus {
    const options = {
        [TileStatus.Revealed]: TileStatus.Hidden,
        [TileStatus.Hidden]: TileStatus.Revealed,
    } as { [key in TileStatus]: TileStatus };

    return options[currentState] || TileStatus.Hidden;
}

export default TileContainer;
