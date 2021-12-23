import { MouseEvent} from 'react';
import { cardsSlice } from './app/cardsSlice';
import { selectedSlice } from './app/selectedSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Buttons } from './components/Buttons';
import { Card } from './components/Card';
import { MainHeader } from './components/MainHeader';
import { foundSlice } from './app/foundSlice';



export type cardType = {
  id: number;
  src: string;
  corr?: number;
}

const cardList: cardType[] = [
  {id: 1, src: './img/1.jpg'},
  {id: 2, src: './img/2.jpg'},
  {id: 3, src: './img/3.jpg'},
  {id: 4, src: './img/4.jpg'},
  {id: 5, src: './img/5.jpg'},
  {id: 6, src: './img/6.jpg'},
  {id: 7, src: './img/7.jpg'},
  {id: 8, src: './img/8.jpg'},
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

  const selected = useAppSelector(state => state.selected)
  const cards = useAppSelector(state => state.cards)
  const foundCards = useAppSelector(state => state.foundPairs)

  const handleClick = (id: number) => {
    const selectedCard = cards.find(x => x.id === selected)

    if (foundCards.includes(id)) {
      console.log('Already found!')
      return
    }

    // No card selected yet => new selection
    if (selectedCard === undefined) {
      dispatch(selectedSlice.actions.select(id))
    }
    // Clicked card is same as selected card => deselect
    else if (selectedCard.id === id) {
      dispatch(selectedSlice.actions.deselect())

    // Clicked card matches selected card => pair found
    } else if (selectedCard.corr === id) {
      dispatch(foundSlice.actions.addFound(id))
      dispatch(foundSlice.actions.addFound(selectedCard.id))
      console.log('Pair found!')
      dispatch(selectedSlice.actions.deselect())

    // Clicked card does not match selected card => error message / color change
    } else {
      dispatch(selectedSlice.actions.deselect())
      console.log('Wrong pair!')
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