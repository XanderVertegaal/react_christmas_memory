import { MouseEvent} from "react";
import { displaySlice } from "../app/displaySlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectPrizeSlice } from "../app/selectPrizeSlice";

export const Buttons = () => {
    const dispatch = useAppDispatch();

    const counter = useAppSelector(state => state.counter)

    const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        switch ((event.target as HTMLElement).id) {
            case '1':
                dispatch(selectPrizeSlice.actions.select1())
                dispatch(displaySlice.actions.show_prize())
                break;
            case '2':
                dispatch(selectPrizeSlice.actions.select2())
                dispatch(displaySlice.actions.show_prize())
                break
            case '3':
                dispatch(selectPrizeSlice.actions.select3())
                dispatch(displaySlice.actions.show_prize())
                break
            default:
                break;
        }
    }

    return (
        <form className="button__form">
                <button 
                    id="1"
                    className={counter < 5 ? "button__item button--disabled" : "button__item"} 
                    onClick={handleSelect}
                    disabled={counter < 5}
                >5 wins</button>
                <button 
                    id="2"
                    className={counter < 10 ? "button__item button--disabled" : "button__item"}
                    onClick={handleSelect}
                    disabled={counter < 10}
                >10 wins</button>
                <button
                    id="3"
                    className={counter < 15 ? "button__item button--disabled" : "button__item"}
                    onClick={handleSelect}
                    disabled={counter < 15}
                >15 wins</button>
        </form>
    )}