import { oneDimentionalIndexToTwo, twoDimentionalIndexToOne } from "../array-utils/array-utils.service";

export const MINE_TILE = -1;
export const NUMBER_TILE = 0;


export function createBoard(colsNum: number, rowsNum: number, minesCount: number): number[] {
    let oneDimentionalBoard = new Array(rowsNum * colsNum).fill(NUMBER_TILE);
    let referenceIndexBoard = new Array(rowsNum * colsNum).fill(6).map((_, i) => i);

    let mineIndices = [];

    for (let i = minesCount; i > 0; i--) {
        const index = Math.floor(Math.random() * referenceIndexBoard.length);

        mineIndices.push(referenceIndexBoard[index]);
        oneDimentionalBoard[referenceIndexBoard[index]] = MINE_TILE;
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