import { oneDimentionalIndexToTwo, twoDimentionalIndexToOne } from "../array-utils/array-utils.service";
import { DEFAULT_NUMBER_TILE, DEFAULT_MINE_TILE, TileType, Tile } from './board.types';

export function createBoard(colsCount: number, rowsCount: number, minesCount: number): Tile[] {
    let oneDimentionalBoard = new Array(rowsCount * colsCount).fill(6).map(() => ({...DEFAULT_NUMBER_TILE}));
    let referenceIndexBoard = new Array(rowsCount * colsCount).fill(6).map((_, i) => i);

    let mineIndices = [];

    for (let i = minesCount; i > 0; i--) {
        const index = Math.floor(Math.random() * referenceIndexBoard.length);

        mineIndices.push(referenceIndexBoard[index]);
        oneDimentionalBoard[referenceIndexBoard[index]] = {...DEFAULT_MINE_TILE};
        referenceIndexBoard[index] = referenceIndexBoard[referenceIndexBoard.length - 1];

        referenceIndexBoard.pop();
    }

    return calcNumbers(mineIndices, oneDimentionalBoard, colsCount, rowsCount);
}

function calcNumbers(mineIndices: number[], board: Tile[], colsCount: number, rowsCount: number): Tile[] {
    mineIndices.forEach(mine => {
        const neighbours = findNeighbours(mine, colsCount, rowsCount);
        neighbours.forEach(neighbour => {
            if (board[neighbour].type === TileType.NumberTile) {
                board[neighbour].value++;
            }
        });
    });

    return board;
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