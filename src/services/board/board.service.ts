import {
  oneDimentionalIndexToTwo,
  twoDimentionalIndexToOne,
} from '../array-utils/array-utils.service';
import {
  DEFAULT_NUMBER_TILE,
  DEFAULT_MINE_TILE,
  TileType,
  Tile,
} from './board.types';
import { TileStatus } from '../../components/tiles/tile.component';

export function createBoard(
  colsCount: number,
  rowsCount: number,
  minesCount: number
): Tile[] {
  let oneDimentionalBoard = new Array(rowsCount * colsCount)
    .fill(6)
    .map(() => ({ ...DEFAULT_NUMBER_TILE }));
  let referenceIndexBoard = new Array(rowsCount * colsCount)
    .fill(6)
    .map((_, i) => i);

  let mineIndices = [];

  for (let i = minesCount; i > 0; i--) {
    const index = Math.floor(Math.random() * referenceIndexBoard.length);

    mineIndices.push(referenceIndexBoard[index]);
    oneDimentionalBoard[referenceIndexBoard[index]] = { ...DEFAULT_MINE_TILE };
    referenceIndexBoard[index] =
      referenceIndexBoard[referenceIndexBoard.length - 1];

    referenceIndexBoard.pop();
  }

  return calcNumbers(mineIndices, oneDimentionalBoard, colsCount, rowsCount);
}

function calcNumbers(
  mineIndices: number[],
  board: Tile[],
  colsCount: number,
  rowsCount: number
): Tile[] {
  mineIndices.forEach((mine) => {
    const neighbours = findNeighbours(mine, colsCount, rowsCount);
    neighbours.forEach((neighbour) => {
      if (board[neighbour].type === TileType.NumberTile) {
        board[neighbour].value++;
      }
    });
  });

  return board;
}

function findNeighbours(
  index: number,
  colsCount: number,
  rowsCount: number
): number[] {
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

export function revealEmptyTiles(
	board: Tile[],
	position: number,
	colsCount: number,
	rowsCount: number,
	revealedTilesCount: number,
	setRevealedTilesCount: (count: number) => void
): void {
	let arr: number[] = [position];
	let countOfRevealed = 1;

	while (arr.length > 0) {
		let currentPosition: number = arr.pop() || 0;
		const neighbours: number[] = findNeighbours(
			currentPosition,
			colsCount,
			rowsCount
		);
		const hiddenNeighbours = neighbours.filter((neighbour) => board[neighbour].status === TileStatus.Hidden);

		countOfRevealed += hiddenNeighbours.length;

		hiddenNeighbours.forEach(neighbourIndex => {
			board[neighbourIndex].status = TileStatus.Revealed;
		});

		arr.push(
			...hiddenNeighbours
				.filter((neighbourIndex) => board[neighbourIndex].value === 0)
		);
	}
	countOfRevealed > 1 && setRevealedTilesCount(revealedTilesCount + countOfRevealed);
}

export function toggleFlag(
	currentStatus: TileStatus,
	flagCount: number,
	setFlagCount: (count: number) => void
): TileStatus {
	if (currentStatus === TileStatus.Flag) {
		setFlagCount(flagCount + 1);
		return TileStatus.Hidden;
	}
	if (currentStatus === TileStatus.Hidden) {
		if (flagCount > 0) {
			setFlagCount(flagCount - 1);
			return TileStatus.Flag;
		}
		else {
			alert("You don't have any more flags to use");
		}
	}

	return currentStatus;
}

export function revealTile(
	currentState: TileStatus,
	numberOfRevealedTiles: number,
	setNumberOfRevealedTiles: (count: number) => void
): TileStatus {
	const options = {
		[TileStatus.Hidden]: TileStatus.Revealed,
	} as { [key in TileStatus]: TileStatus };

	if (options[currentState] && options[currentState] !== currentState) {
		setNumberOfRevealedTiles(numberOfRevealedTiles + 1);
		return options[currentState];
	}
	return currentState;
}
