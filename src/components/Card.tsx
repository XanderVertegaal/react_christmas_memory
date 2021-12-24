import { useAppSelector } from "../app/hooks";

type CardProps = {
    cardId: number;
    handleClick: (id: number) => void;
}

export const Card = ({cardId, handleClick}: CardProps) => {
    const selected = useAppSelector(state => state.selected)
    const found = useAppSelector(state => state.foundPairs)
    const wrong = useAppSelector(state => state.wrong)
    let cardClass = 'card'
    
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
                    <p className="card__text">{cardId}</p>
                </div>
                <div className="card-back"></div>
            </div>
        </div>
    )
}