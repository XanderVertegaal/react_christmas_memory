import { MouseEvent} from 'react';
import { cardsSlice } from './app/cardsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Buttons } from './components/Buttons';
import { Card } from './components/Card';
import { MainHeader } from './components/MainHeader';



export type cardType = {
  id: number;
  src: string;
  corr?: string;
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
    cardCopy.corr = String(corrId)
    let new_card: cardType = {id: corrId, src: card.src, corr: String(id)}
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
    const cards = shuffleCards(cardList)
    dispatch(cardsSlice.actions.get_cards(cards))
    console.log(cards)
  }

  const cards = useAppSelector(state => state.cards)
  const cardItems = cards.map(c => <Card text={String(c.id)}/>)

  return (
    <>
    <MainHeader />
    <article className='card__grid'>
      {cardItems}
    </article>
    <Buttons handleRestart={handleRestart}/>
    </>
  );
}