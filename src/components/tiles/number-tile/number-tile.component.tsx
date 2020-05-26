import React from 'react';
import './number-tile.component.scss';

function NumberTile({ value }: { value: number }) {
    return (
        <div className={`tile number ${value}`}
            style={{ 'color': `hsl(${value * 70}, 100%, 50%)` }}>
            {value}
        </div>
    );
}

export default NumberTile;
