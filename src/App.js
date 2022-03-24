import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png" , matched:false},
  {"src": "/img/potion-1.png", matched:false},
  {"src": "/img/ring-1.png", matched:false},
  {"src": "/img/scroll-1.png", matched:false},
  {"src": "/img/shield-1.png", matched:false},
  {"src": "/img/sword-1.png", matched:false},
]

function App() {
  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDesable] = useState(false);



    //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=> 
      Math.random() - 0.5
    ).map((card) => ({...card, id:Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  }
  //handle Choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards 
  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setDesable(true);
      if(choiceOne.src === choiceTwo.src){
       setCards(prevCards => {
         return prevCards.map(card => {
           if(card.src === (choiceOne.src || choiceTwo.src )){
             return {...card, matched:true}
           }else{
             return card;
           }
         } )
       })
        resetTurn();
      }
      else{
        
        setTimeout(() => resetTurn(), 500)
      }
    }
  }, [choiceOne, choiceTwo])

  
  
  //reset choices and increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDesable(false);
  }
  //start new game automatically 
  useEffect(()=> {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick = {shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice = {handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched} 
          disabled = {disable}
          />
        ))}
      
      </div>
      
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
