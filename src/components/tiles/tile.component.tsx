import React from 'react';
import img from './../../assets/icons8-flag-filled-100.png';
import './tile.component.scss';
import { TileStatus, ClickType } from '../../services/board/tile.types';

type TileProps = React.PropsWithChildren<{
  style: object;
  status: TileStatus;
  onClick: (clickType: ClickType, tileStatus: TileStatus) => void;
}>;

const Tile: React.FunctionComponent<TileProps> = (props: TileProps) => {
  return (
    <div
      className={`tile`}
      onMouseDownCapture={(event) => {
        props.onClick(event.shiftKey ? ClickType.Secondary : ClickType.Primary, props.status);
        event.stopPropagation();
      }}
      style={props.style}
    >
      {props.status === TileStatus.Flag && <img src={img} alt={props.status} />}
      {props.status === TileStatus.Revealed && <>{props.children}</>}
    </div>
  );
};

export default Tile;
