import React from 'react';
import './number-tile.component.scss';
import Tile, { TileProps } from '../abstract-tile/tile.component';

function NumberTile(props: TileProps & { value: number }) {
  return (
    <Tile {...props}>
      <div className={`tile number ${props.value}`} style={{ color: `hsl(${props.value * 70}, 100%, 50%)` }}>
        {props.value}
      </div>
    </Tile>


  );
}

export default NumberTile;
