import Board from "../components/board/board.component";
import React from "react";
import './game.page.scss'

function Game() {
    return <Board colsNum={4} rowsNum={7} mineCount={7} />
}

export default Game;