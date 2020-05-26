import React from 'react';
import img from './../../../assets/icons8-flag-filled-100.png';

export enum TileStatus {
    Hidden = "Hidden",
    Revealed = "Revealed",
    Flag = "Flag"
}

export enum ClickType {
    Primary,
    Secondary
}

type TileProps = React.PropsWithChildren<{ status: TileStatus, onClick: (clickType: ClickType, tileStatus: TileStatus) => void }>

const Tile: React.FunctionComponent<TileProps> = (props: TileProps) => {
    return (
        <div className='tile'
            onMouseDownCapture={
                (event) => {
                    props.onClick(event.shiftKey ? ClickType.Secondary: ClickType.Primary, props.status)
                    event.stopPropagation();
                }
            }
        >
            {
                props.status === TileStatus.Flag && <img src={img} alt={props.status} />
            }
            {
                props.status === TileStatus.Revealed && <>{props.children}</>
            }
        </div>
    );
}


export default Tile;
