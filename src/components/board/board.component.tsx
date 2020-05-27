import React, { useState, useEffect, useCallback, useContext } from 'react';
import './board.component.scss';
import TileContainer from '../tiles/tile.container';
import { twoDimentionalIndexToOne } from '../../services/array-utils/array-utils.service';
import {
	createBoard,
	findNeighbours,
} from '../../services/board/board.service';
import { TileStatus, ClickType } from '../tiles/tile.component';
import {
	DEFAULT_MINE_TILE,
	Tile,
	TileType,
} from '../../services/board/board.types';
import { FixedSizeGrid as Grid } from 'react-window';
import { GameContext } from './../../pages/game.page';

function Board(props: {
	colsCount: number;
	rowsCount: number;
	mineCount: number;
}) {
	const {
		isGameRunning,
		remainingFlagsCount,
		setFlagCount,
		minesCount,
	} = useContext(GameContext);
	let [board, setBoard] = useState<Tile[]>([]);
	let [revealedTilesCount, setNumberOfRevealedTiles] = useState(0);

	const onMineClick = useCallback(
		(clickType: ClickType, tileStatus: TileStatus, position: number) => {
			if (board.length !== props.colsCount * props.rowsCount) {
			} else if (
				clickType === ClickType.Primary &&
				tileStatus === TileStatus.Hidden
			) {
				board.length &&
					board.forEach((tile: Tile) => {
						if (tile.type === TileType.Mine) {
							tile.status = TileStatus.Revealed;
						}
					});
				setTimeout(() => alert('You have lost!'), 0);
			} else if (clickType === ClickType.Secondary) {
				board[position].status = toggleFlag(
					tileStatus,
					remainingFlagsCount,
					setFlagCount
				);
			}
			setBoard([...board]);
		},
		[board, remainingFlagsCount]
	);

	const onNumberTileClick = useCallback(
		(clickType: ClickType, tileStatus: TileStatus, position: number) => {
			if (board.length !== props.colsCount * props.rowsCount) {
			} else if (clickType === ClickType.Primary) {
				const n = revealTile(
					tileStatus,
					revealedTilesCount,
					setNumberOfRevealedTiles
				);
				board[position].status = n;

				if (board[position].value === 0) {
					revealEmptyTiles(board, position, props.colsCount, props.rowsCount, revealedTilesCount, setNumberOfRevealedTiles);
				}
			} else if (clickType === ClickType.Secondary) {
				board[position].status = toggleFlag(
					board[position].status,
					remainingFlagsCount,
					setFlagCount
				);
			}
			setBoard([...board]);
		},
		[board, props.colsCount, props.rowsCount, revealedTilesCount]
	);

	useEffect(() => {
		setBoard(createBoard(props.colsCount, props.rowsCount, props.mineCount));
	}, [props.colsCount, props.rowsCount, props.mineCount]);

	useEffect(() => {
		checkWin(
			props.colsCount,
			props.rowsCount,
			revealedTilesCount,
			minesCount,
			remainingFlagsCount
		);
	}, [
		props.colsCount,
		props.rowsCount,
		revealedTilesCount,
		minesCount,
		remainingFlagsCount,
	]);

	return board.length > 0 ? (
		<Grid
			columnCount={props.colsCount}
			rowCount={props.rowsCount}
			columnWidth={50}
			width={500}
			height={500}
			rowHeight={50}
		>
			{({ columnIndex, rowIndex, style }) => {
				return createCell(
					style,
					twoDimentionalIndexToOne(columnIndex, rowIndex, props.colsCount),
					board,
					onMineClick,
					onNumberTileClick
				);
			}}
		</Grid>
	) : null;
}

function createCell(
	style: object,
	position: number,
	board: Tile[],
	onMineClick: (
		clickType: ClickType,
		tileStatus: TileStatus,
		position: number
	) => void,
	onNumberTileClick: (
		clickType: ClickType,
		tileStatus: TileStatus,
		position: number
	) => void
) {
	const boardItem = board[position];
	if (!boardItem) return null;

	let valueProp: any = {};
	if (boardItem.type !== TileType.Mine) {
		valueProp.value = boardItem.value;
	}
	return (
		<TileContainer
			onClick={
				boardItem.type === TileType.Mine ? onMineClick : onNumberTileClick
			}
			type={boardItem.type}
			position={position}
			key={position}
			{...valueProp}
			style={style}
			status={boardItem.status}
		/>
	);
}

function checkWin(
	colsCount: number,
	rowsCount: number,
	revealedTilesCount: number,
	minesCount: number,
	remainingFlagsCount: number
) {
	console.log({
		colsCount,
		rowsCount,
		minesCount,
		revealedTilesCount,
		remainingFlagsCount,
	});
	if (
		colsCount * rowsCount - minesCount === revealedTilesCount &&
		remainingFlagsCount === 0
	) {
		alert('You win!');
	}
}

function revealEmptyTiles(
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

function toggleFlag(
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

function revealTile(
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

export default Board;
