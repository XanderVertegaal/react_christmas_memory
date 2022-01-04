import { MouseEvent, useEffect} from 'react';
import { cardsSlice } from './app/cardsSlice';
import { selectedSlice } from './app/selectedSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Buttons } from './components/Buttons';
import { MainHeader } from './components/MainHeader';
import { foundSlice } from './app/foundSlice';
import { counterSlice } from './app/counterSlice';
import { CardBoard } from './components/CardBoard';
import { PrizePicture } from './components/PrizePicture';
import { displaySlice } from './app/displaySlice';
import { Footer } from './components/Footer';

export type cardType = {
  id: number;
  corr: number;
}

const cardList: cardType[] = [
  {id: 1, corr: 0},
  {id: 2, corr: 0},
  {id: 3, corr: 0},
  {id: 4, corr: 0},
  {id: 5, corr: 0},
  {id: 6, corr: 0},
  {id: 7, corr: 0},
  {id: 8, corr: 0},
]

const shuffleCards = (cardList: cardType[]) => {
  let id = 1
  let corrId = id + cardList.length
  let newCardList: cardType[] = []
  for (let card of cardList) {
    let cardCopy: cardType = {...card}
    cardCopy.id = id
    cardCopy.corr = corrId
    let new_card: cardType = {id: corrId, corr: id}
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
    dispatch(displaySlice.actions.show_board())
    const shuffledCards = shuffleCards(cardList)
    dispatch(cardsSlice.actions.set_cards(shuffledCards))
    dispatch(selectedSlice.actions.deselect())
    dispatch(foundSlice.actions.emptyFound())
  }

  const cards = useAppSelector(state => state.cards)
  const foundCards = useAppSelector(state => state.foundPairs)
  const display = useAppSelector(state => state.display)
  const selectedPrize = useAppSelector(state => state.selectedPrize)

  useEffect(() => {
    if (foundCards.length === cards.length && foundCards.length !== 0) {
      dispatch(counterSlice.actions.increment())
    }
  }, [foundCards, cards.length, dispatch])

  return (
    <>
      <MainHeader handleRestart={handleRestart} />
      {display === 'board' ? <CardBoard /> : <PrizePicture no={selectedPrize}/>}
      <Buttons />
      <Footer />
    </>
  );
}