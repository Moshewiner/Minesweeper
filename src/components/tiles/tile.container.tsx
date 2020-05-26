import React, { useState } from 'react';
import MineTile from './mine/mine-tile.component';
import NumberTile from './number/number-tile.component';
import Tile, { TileStatus, ClickType } from './tile.component';

interface Mine {
    type: "Mine",
}   

//TODO: find better name
interface Number {
    type: "Number",
    value: number;
}


function TileContainer(props: Mine | Number) {
    let [status, setStatus]: [TileStatus, any] = useState(TileStatus.Hidden);
    return (
        <Tile
            status={status}
            onClick={
                (clickType: ClickType, tileStatus: TileStatus) => {
                    if(clickType === ClickType.Primary) {
                        setStatus(revealTile(tileStatus));
                    }
                    else if(clickType === ClickType.Secondary) {
                        setStatus(toggleFlag(tileStatus));
                    }
                }
            }
        >
            {
                props.type === 'Mine' ? <MineTile /> : <NumberTile value={(props as Number).value} />
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

    return options[currentState] || currentState;
}

function revealTile(currentState: TileStatus): TileStatus {
    const options = {
        [TileStatus.Hidden]: TileStatus.Revealed,
    } as { [key in TileStatus]: TileStatus };

    return options[currentState] || currentState;
}

export default TileContainer;
