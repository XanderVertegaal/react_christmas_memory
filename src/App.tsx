import { MouseEvent, useEffect} from 'react';
import { cardsSlice } from './app/cardsSlice';
import { selectedSlice } from './app/selectedSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Buttons } from './components/Buttons';
import { Card } from './components/Card';
import { MainHeader } from './components/MainHeader';
import { foundSlice } from './app/foundSlice';
import { wrongSlice } from './app/wrongSlice';
import { counterSlice } from './app/counterSlice';



export type cardType = {
  id: number;
  src: string;
  corr: number;
}

const cardList: cardType[] = [
  {id: 1, src: './img/1.jpg', corr: 0},
  {id: 2, src: './img/2.jpg', corr: 0},
  {id: 3, src: './img/3.jpg', corr: 0},
  {id: 4, src: './img/4.jpg', corr: 0},
  {id: 5, src: './img/5.jpg', corr: 0},
  {id: 6, src: './img/6.jpg', corr: 0},
  {id: 7, src: './img/7.jpg', corr: 0},
  {id: 8, src: './img/8.jpg', corr: 0},
]

const shuffleCards = (cardList: cardType[]) => {
  let id = 1
  let corrId = id + cardList.length
  let newCardList: cardType[] = []
  for (let card of cardList) {
    let cardCopy: cardType = {...card}
    cardCopy.id = id
    cardCopy.corr = corrId
    let new_card: cardType = {id: corrId, src: card.src, corr: id}
    newCardList.push(cardCopy)
    newCardList.push(new_card)
    id++
    corrId++
  }
  const shuffledList = newCardList.sort(() => Math.random() - .5)
  return shuffledList
}

export const App = () => {

  const dispatch = useAppDispatch();

  const handleRestart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const shuffledCards = shuffleCards(cardList)
    dispatch(cardsSlice.actions.set_cards(shuffledCards))
    dispatch(selectedSlice.actions.deselect())
    dispatch(foundSlice.actions.emptyFound())
  }

  const cards = useAppSelector(state => state.cards)
  const selected = useAppSelector(state => state.selected)
  const matching = cards.filter(card => selected.includes(card.corr))
  const foundCards = useAppSelector(state => state.foundPairs)

  useEffect(() => {
    if (foundCards.length === cards.length) {
      dispatch(counterSlice.actions.increment())
    }
  }, [foundCards, cards.length, dispatch])

  const handleClick = async (id: number) => {
    // Clicked card is already found or card is already selected > deselect.
    if (foundCards.includes(id) || selected.includes(id)) {
      console.log('Already found!')
      dispatch(selectedSlice.actions.deselect())
      return
    }

    if (selected.length === 1) {
      // Clicked card matches selected card => pair found
      if (matching.some(card => card.id === id)) {
        const selectedCard = matching.find(card => card.id === id)!
        console.log('Match found! Matching card:', selectedCard)
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

  const cardItems = cards.map(c => <Card handleClick={handleClick} cardId={c.id} key={c.id}/>)

  return (
    <>
    <MainHeader handleRestart={handleRestart} />
    <article className='card__grid'>
      {cardItems}
    </article>
    <Buttons />
    </>
  );
}