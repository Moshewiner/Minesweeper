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
                (clickType: ClickType, tileStatus: TileStatus) => {
                    if(clickType === ClickType.Primary) {
                        setStatus(toggleTile(tileStatus));
                    }
                    else if(clickType === ClickType.Secondary) {
                        setStatus(toggleFlag(tileStatus));
                    }
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
    console.log("toggle flag@")
    const options = {
        [TileStatus.Flag]: TileStatus.Hidden,
        [TileStatus.Hidden]: TileStatus.Flag,
    } as { [key in TileStatus]: TileStatus }

    return options[currentState] || TileStatus.Hidden;
}

function toggleTile(currentState: TileStatus): TileStatus {
    console.log("Toggle tile!")
    const options = {
        [TileStatus.Revealed]: TileStatus.Hidden,
        [TileStatus.Hidden]: TileStatus.Revealed,
    } as { [key in TileStatus]: TileStatus };

    return options[currentState] || TileStatus.Hidden;
}

export default TileContainer;
