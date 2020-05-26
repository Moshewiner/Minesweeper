import React from 'react';
import './number-tile.component.scss';


function NumberTile(props: {value: number}) {
    return (
        <div className={`tile number ${props.value}`} style={{'color': `hsl(${props.value * 70}, 100%, 50%)`}}>
            {props.value}
        </div>
    );
}

export default NumberTile;
