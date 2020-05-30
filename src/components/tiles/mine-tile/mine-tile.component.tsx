import React from 'react';
import img from './../../../assets/icons8-naval-mine-100.png';
import Tile, { TileProps } from '../abstract-tile/tile.component';

function MineTile(props: TileProps) {
  return (
    <Tile {...props}>
      <div className="mine">
        <img src={img} alt="Mine" />
      </div>
    </Tile>
  );
}

export default MineTile;
