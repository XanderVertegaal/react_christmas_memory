import { useAppSelector } from "../app/hooks";
import { MouseEvent } from "react";

export const MainHeader = ({handleRestart}: {handleRestart: (event: MouseEvent<HTMLButtonElement>) => void}) => {
    const counter = useAppSelector(state => state.counter);
    const foundPairs = useAppSelector(state => state.foundPairs);

    return (
        <header>
            <h1 className="title__main">Christmas memory game</h1>
            <h2 className="title__sub">A bit of Vlamenburg in Cameroon 2021 -- 2022</h2>
            <section className="counters">
                <p>Move counter: {counter}</p>
                <button id="btn--restart" className="button" onClick={handleRestart}>New Game</button>
                <p>Found pairs: {foundPairs.length / 2}</p>
            </section>
        </header>
    )
}