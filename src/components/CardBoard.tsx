import { foundSlice } from "../app/foundSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectedSlice } from "../app/selectedSlice";
import { wrongSlice } from "../app/wrongSlice";
import { Card } from "./Card";

export const CardBoard = () => {

    const dispatch = useAppDispatch();

    const cards = useAppSelector(state => state.cards)
    const selected = useAppSelector(state => state.selected)
    const matching = cards.filter(card => selected.includes(card.corr))
    const foundCards = useAppSelector(state => state.foundPairs)

    const handleClick = (id: number) => {
        // Clicked card is already found or card is already selected > deselect.
        if (foundCards.includes(id) || selected.includes(id)) {
          dispatch(selectedSlice.actions.deselect())
          return
        }

        if (selected.length === 2) {
          return
        }
    
        if (selected.length === 1) {
          // Clicked card matches selected card => pair found
          if (matching.some(card => card.id === id)) {
            const selectedCard = matching.find(card => card.id === id)!
            dispatch(selectedSlice.actions.select(id))
            dispatch(foundSlice.actions.addFound(id))
            dispatch(foundSlice.actions.addFound(selectedCard.corr))
            setTimeout(() => {dispatch(selectedSlice.actions.deselect())}, 1000)
    
          // Clicked card does not match selected card => error message / color change
          } else {
            dispatch(selectedSlice.actions.select(id))
            for (let sel of selected) {
              dispatch(wrongSlice.actions.addWrong(sel))
            }
            dispatch(wrongSlice.actions.addWrong(id))
            setTimeout(() => {
              dispatch(selectedSlice.actions.deselect())
              dispatch(wrongSlice.actions.clearWrong())
            }, 1000)
          }
        } else {
          dispatch(selectedSlice.actions.select(id))
        }  
      }

    const cardItems = cards.map(c => <Card 
        handleClick={handleClick} 
        cardId={c.id}
        key={c.id}
    />)

    return (
        <article className='card__grid'>
        {cardItems}
      </article>
    )
}