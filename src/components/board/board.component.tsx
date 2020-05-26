import React, { useState } from 'react';
import './board.component.scss';
import TileContainer from '../tiles/tile.container';
import { twoDimentionalIndexToOne } from '../../services/array-utils/array-utils.service';
import { MINE_TILE, createBoard } from '../../services/board/board.service';


function Board(props: { colsCount: number, rowsCount: number, mineCount: number }) {
    let [board, ]: [Array<number>, any] = useState(createBoard(props.colsCount, props.rowsCount, props.mineCount));
    let [rows, ]: [any[][], any] = useState(createRows(board, props.colsCount, props.rowsCount));
    
    return (
        <div className="board">{rows}</div>
    );
}


function createRows(board: number[], colsCount: number, rowsCount: number): any[] {
    let rows = [];
    for (let row = 0; row < rowsCount; row++) {
        const rowItems = [];
        for (let cell = 0; cell < colsCount; cell++) {
            const boardItem = board[twoDimentionalIndexToOne(row, cell, colsCount)];
            console.log({boardItem})
            if (boardItem === MINE_TILE) {
                rowItems.push(<TileContainer type="Mine" key={cell}></TileContainer>);
            }
            else {
                rowItems.push(<TileContainer type="NumberTileType" value={boardItem} key={cell}></TileContainer>);
            }

        }
        rows.push(<div className='row' key={row}>{rowItems}</div>)
    }

    return rows;
}


export default Board;
