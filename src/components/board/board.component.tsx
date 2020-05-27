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

	const { isGameRunning, flagCount, setFlagCount } = useContext(GameContext);
	let [board, setBoard] = useState<Tile[]>([]);

	const onMineClick = useCallback(
		(clickType: ClickType, tileStatus: TileStatus, position: number) => {
			if (board.length !== props.colsCount * props.rowsCount) {
			} else if (clickType === ClickType.Primary) {
				board.length &&
					board.forEach((tile: Tile) => {
						if (tile.type === TileType.Mine) {
							tile.status = TileStatus.Revealed;
						}
					});
				setTimeout(() => alert('You have lost!'), 0);
			} else if (clickType === ClickType.Secondary) {
				board[position].status = toggleFlag(tileStatus, flagCount, setFlagCount);
			}
			setBoard([...board]);
		},
		[board]
	);

	const onNumberTileClick = useCallback(
		(clickType: ClickType, tileStatus: TileStatus, position: number) => {
			if (board.length !== props.colsCount * props.rowsCount) {
			} else if (clickType === ClickType.Primary) {
				const n = revealTile(tileStatus);
				board[position].status = n;

				if (board[position].value === 0) {
					revealEmptyTiles(board, position, props.colsCount, props.rowsCount);
				}
			} else if (clickType === ClickType.Secondary) {
				board[position].status = toggleFlag(board[position].status, flagCount, setFlagCount);
			}
			setBoard([...board]);
		},
		[board, props.colsCount, props.rowsCount]
	);

	useEffect(() => {
		setBoard(createBoard(props.colsCount, props.rowsCount, props.mineCount));
	}, [props.colsCount, props.rowsCount, props.mineCount]);

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

	const isMine = boardItem.value === DEFAULT_MINE_TILE.value;
	let valueProp: any = {};
	if (!isMine) {
		valueProp.value = boardItem.value;
	}
	return (
		<TileContainer
			onClick={isMine ? onMineClick : onNumberTileClick}
			type={isMine ? 'Mine' : 'NumberTileType'}
			position={position}
			key={position}
			{...valueProp}
			style={style}
			status={boardItem.status}
		/>
	);
}

function revealEmptyTiles(
	board: Tile[],
	position: number,
	colsCount: number,
	rowsCount: number
): void {
	let arr: number[] = [position];

	while (arr.length > 0) {
		let currentPosition: number = arr.pop() || 0;
		const neighbours: number[] = findNeighbours(
			currentPosition,
			colsCount,
			rowsCount
		);

		arr.push(
			...neighbours
				.filter((neighbour) => board[neighbour].status === TileStatus.Hidden)
				.map((neighbourIndex: number) => {
					board[neighbourIndex].status = TileStatus.Revealed;
					return neighbourIndex;
				})
				.filter((neighbourIndex) => board[neighbourIndex].value === 0)
		);
	}
}

function toggleFlag(currentState: TileStatus, flagCount: number, setFlagCount: (count: number) => void): TileStatus {
	const options = {
		[TileStatus.Flag]: TileStatus.Hidden,
		[TileStatus.Hidden]: TileStatus.Flag,
	} as { [key in TileStatus]: TileStatus };

	if (currentState === TileStatus.Flag && options[currentState] !== currentState) {
		setFlagCount(flagCount + 1);
		return options[currentState] || currentState;
	}
	if (flagCount > 0) {
		setFlagCount(flagCount - 1);
		return options[currentState] || currentState;
	}
	else {
		alert("You don't have any more flags to use");
	}
	return currentState;
}

function revealTile(currentState: TileStatus): TileStatus {
	const options = {
		[TileStatus.Hidden]: TileStatus.Revealed,
	} as { [key in TileStatus]: TileStatus };

	return options[currentState] || currentState;
}

export default Board;
