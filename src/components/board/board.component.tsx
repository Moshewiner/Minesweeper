import React, { useState } from 'react';
import './board.component.scss';
import TileContainer from '../tiles/tile.container';

const MINE = -1;
const NUMBER = 0;


function Board(props: { colsCount: number, rowsCount: number, mineCount: number }) {
    let [board, setBoard]: [Array<number>, any] = useState(createBoard(props.colsCount, props.rowsCount, props.mineCount));
    let [rows, setRows]: [any[][], any] = useState(createRows(board, props.colsCount, props.rowsCount));
    
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
            if (boardItem === MINE) {
                rowItems.push(<TileContainer type="Mine" key={cell}></TileContainer>);
            }
            else {
                rowItems.push(<TileContainer type="Number" value={boardItem} key={cell}></TileContainer>);
            }

        }
        rows.push(<div className='row' key={row}>{rowItems}</div>)
    }

    return rows;
}

function createBoard(colsNum: number, rowsNum: number, minesCount: number): number[] {
    let oneDimentionalBoard = new Array(rowsNum * colsNum).fill(NUMBER);
    let referenceIndexBoard = new Array(rowsNum * colsNum).fill(6).map((_, i) => i);

    let mineIndices = [];

    for (let i = minesCount; i > 0; i--) {
        const index = Math.floor(Math.random() * referenceIndexBoard.length);

        mineIndices.push(referenceIndexBoard[index]);
        oneDimentionalBoard[referenceIndexBoard[index]] = MINE;
        referenceIndexBoard[index] = referenceIndexBoard[referenceIndexBoard.length - 1];

        referenceIndexBoard.pop();
    }

    return calcNumbers(mineIndices, oneDimentionalBoard, colsNum, rowsNum);
}

function calcNumbers(mineIndices: number[], board: number[], colsCount: number, rowsCount: number): number[] {
    mineIndices.forEach(mine => {
        const neighbours = findNeighbours(mine, colsCount, rowsCount);
        neighbours.forEach(neighbour => {
            if (board[neighbour] >= 0) {
                board[neighbour]++;
            }
        });
    });

    return board;
}

function oneDimentionalIndexToTwo(index: number, colsCount: number): [number, number] {
    return [Math.floor(index / colsCount), index % colsCount];
}

function twoDimentionalIndexToOne(x: number, y: number, colsCount: number): number {
    return x * colsCount + y;
}

function findNeighbours(index: number, colsCount: number, rowsCount: number) {
    const [i, j] = oneDimentionalIndexToTwo(index, colsCount);
    
    let neighbours = [];
    
    for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowsCount - 1); x++) {
        for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, colsCount - 1); y++) {
            if (x !== i || y !== j) {
                neighbours.push(twoDimentionalIndexToOne(x, y, colsCount));
            }
        }
    }
    
    return neighbours;
}

export default Board;
