import { useAppSelector } from "../app/hooks";

type CardProps = {
    cardId: number;
    handleClick: (id: number) => void;
}

export const Card = ({cardId, handleClick}: CardProps) => {
    const selected = useAppSelector(state => state.selected)
    const found = useAppSelector(state => state.foundPairs)
    let cardClass = 'card'
    
    if (found.includes(cardId)) {
        cardClass = 'card card-found'
    } else if (cardId === selected) {
        cardClass = 'card card-selected'
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