import { displaySlice } from "../app/displaySlice";
import { useAppDispatch } from "../app/hooks";
import prize1 from "../img/prize1.jpg"
import prize2 from "../img/prize2.jpg"
import prize3 from "../img/prize3.jpg"

export const PrizePicture = ({no}: {no: number}) => {

    const dispatch = useAppDispatch();

    const sourceDict: {[key: number]: string} = {
        1: prize1,
        2: prize2,
        3: prize3
    }

    const source = sourceDict[no]
    
    return (
        <article className="prize__wrapper">
            <img className="prize__image" src={source} alt="prize" />
            <button className="prize__return" onClick={() => dispatch(displaySlice.actions.show_board())}>Return</button>
        </article>
    )
}