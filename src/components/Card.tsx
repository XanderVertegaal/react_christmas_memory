import { useAppSelector } from "../app/hooks";
import img1 from "../img/1.jpg"
import img2 from "../img/2.jpg"
import img3 from "../img/3.jpg"
import img4 from "../img/4.jpg"
import img5 from "../img/5.jpg"
import img6 from "../img/6.jpg"
import img7 from "../img/7.jpg"
import img8 from "../img/8.jpg"

type CardProps = {
    cardId: number;
    handleClick: (id: number) => void;
}

export const Card = ({cardId, handleClick}: CardProps) => {
    const selected = useAppSelector(state => state.selected)
    const found = useAppSelector(state => state.foundPairs)
    const wrong = useAppSelector(state => state.wrong)
    let cardClass = 'card'
    
    const cardDict: {
        [key:number]: string
    } = {
        1: img1,
        2: img2,
        3: img3,
        4: img4,
        5: img5,
        6: img6,
        7: img7,
        8: img8,
        9: img1,
        10: img2,
        11: img3,
        12: img4,
        13: img5,
        14: img6,
        15: img7,
        16: img8
    }

    const cardStyle = {
        background: `center / cover url(${cardDict[cardId]})`
    }

    if (found.includes(cardId)) {
        cardClass = 'card card-found'
    } else if (wrong.includes(cardId)) {
        cardClass = 'card card-wrong'
    } else if (selected.includes(cardId)) {
        cardClass = 'card card-flipped'
    }

    return (
        <div className={cardClass} onClick={() => handleClick(cardId)}>
            <div className="card-inner">
                <div className="card-front">
                    <p className="card__text"></p>
                </div>
                <div className="card-back" style={cardStyle}></div>
            </div>
        </div>
    )
}