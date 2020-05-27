import React, { useState, useEffect } from 'react';
import './board.component.scss';
import TileContainer from '../tiles/tile.container';
import { twoDimentionalIndexToOne } from '../../services/array-utils/array-utils.service';
import { createBoard } from '../../services/board/board.service';
import { TileStatus, ClickType } from '../tiles/tile.component';
import { DEFAULT_MINE_TILE, Tile, TileType } from '../../services/board/board.types';


function Board(props: { colsCount: number, rowsCount: number, mineCount: number }) {
    let [board, setBoard]: [Array<Tile>, (board: Tile[]) => void] = useState(createBoard(props.colsCount, props.rowsCount, props.mineCount));
    const rows = createRows(board, setBoard, props.colsCount, props.rowsCount);

    return (
        <div className="board">{rows}</div>
    );
}


function createRows(board: Tile[], setBoard: (board: Tile[]) => void, colsCount: number, rowsCount: number): any[] {
    let rows = [];
    for (let row = 0; row < rowsCount; row++) {
        const rowItems = [];
        for (let cell = 0; cell < colsCount; cell++) {
            const position = twoDimentionalIndexToOne(row, cell, colsCount);
            const boardItem = board[position];
            if (boardItem.value === DEFAULT_MINE_TILE.value) {
                rowItems.push(
                    <TileContainer
                        onClick={
                            async (clickType: ClickType, tileStatus: TileStatus, position: number) => {
                                if (clickType === ClickType.Primary) {
                                    board.length && board.forEach((tile: Tile) => {
                                        if (tile.type === TileType.Mine) {
                                            tile.status = TileStatus.Revealed;
                                        }
                                    });
                                    setTimeout(() => alert("You have lost!"), 0);
                                }
                                else if (clickType === ClickType.Secondary) {
                                    board[position].status = toggleFlag(board[position].status);
                                }
                                await setBoard([ ...board]);
                            }
                        }
                        type="Mine"
                        position={position}
                        key={cell}
                        status={boardItem.status} />
                );
            }
            else {
                rowItems.push(<TileContainer
                    onClick={
                        async (clickType: ClickType, tileStatus: TileStatus, position: number) => {
                            if (clickType === ClickType.Primary) {
                                const n = revealTile(board[position].status);;
                                board[position].status = n;
                            }
                            else if (clickType === ClickType.Secondary) {
                                board[position].status = toggleFlag(board[position].status);
                            }
                            await setBoard([...board]);
                        }
                    }
                    type="NumberTileType"
                    value={boardItem.value}
                    position={position}
                    key={cell}
                    status={boardItem.status} />
                );
            }

        }
        rows.push(<div className='row' key={row}>{rowItems}</div>)
    }

    return rows;
}


function toggleFlag(currentState: TileStatus): TileStatus {
    const options = {
        [TileStatus.Flag]: TileStatus.Hidden,
        [TileStatus.Hidden]: TileStatus.Flag,
    } as { [key in TileStatus]: TileStatus }

    return options[currentState] || currentState;
}

function revealTile(currentState: TileStatus): TileStatus {
    const options = {
        [TileStatus.Hidden]: TileStatus.Revealed,
    } as { [key in TileStatus]: TileStatus };

    return options[currentState] || currentState;
}


export default Board;
