import { MouseEvent } from "react";

export const Buttons = ({handleRestart}: {handleRestart: (event: MouseEvent<HTMLButtonElement>) => void}) => {
    return (
        <form id="input-form">
            <button id="btn--restart" className="button" onClick={handleRestart}>New Game</button>
            <ul id="prizes__list">
                <li id="prizes__1" className="prizes__item">10 victories</li>
                <li id="prizes__2" className="prizes__item">25 victories</li>
                <li id="prizes__3" className="prizes__item">50 victories</li>
            </ul>
        </form>
    )}