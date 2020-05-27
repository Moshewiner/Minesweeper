import React from 'react';
import img from './../../../assets/icons8-naval-mine-100.png';

function MineTile() {
  return (
    <div className="tile mine">
      <img src={img} alt="Mine" />
    </div>
  );
}

export default MineTile;
