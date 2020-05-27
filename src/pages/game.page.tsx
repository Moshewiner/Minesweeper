import Board from "../components/board/board.component";
import React, { useState, useContext } from "react";
import './game.page.scss'


function Game() {



    let colsCount = 6;
    let rowsCount = 6;
    let minesCount = 3;
    const [boardProps, setBoardProps] = useState({ colsCount, rowsCount, minesCount });

    return (
        <>
            <input type='number' placeholder="Number of columns" onChange={(e) => colsCount = +e.target.value} />
            <input type='number' placeholder="Number of rows" onChange={(e) => rowsCount = +e.target.value} />
            <input type='number' placeholder="Number of mines" onChange={(e) => minesCount = +e.target.value} />
            <button onClick={
                () => setBoardProps({ colsCount, rowsCount, minesCount })
            }>New Game</button>
            <Board colsCount={boardProps.colsCount} rowsCount={boardProps.rowsCount} mineCount={boardProps.minesCount} />
        </>);
}

export default Game;