import Board from "../components/board/board.component";
import React, { useState, useContext } from "react";
import './game.page.scss'


function Game() {

    let [colsCount, setColsCount] = useState(6);
    let [rowsCount, setRowsCount] = useState(6);
    let [minesCount, setMinesCount] = useState(3);

    return (
        <>
            <input type='number' placeholder="Number of columns" onChange={(e) => setColsCount(+e.target.value)} />
            <input type='number' placeholder="Number of rows" onChange={(e) => setRowsCount(+e.target.value)} />
            <input type='number' placeholder="Number of mines" onChange={(e) => setMinesCount(+e.target.value)} />
            <Board colsCount={colsCount} rowsCount={rowsCount} mineCount={minesCount} />
        </>);
}

export default Game;