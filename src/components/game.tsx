import { useEffect, useState } from "react";
import Card from "./card";


interface GameProps {
  id: number;
  carNumber: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const Game: React.FC = () => {

  // states
  const [cards, setCards] = useState<GameProps[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [flipCount, setFlipCount] = useState(0);
  const [maxFlip] = useState(30);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState('');
  const [bgColor, setBgColor] = useState('');
  const totalPairs = 5;


    // Function to initialize or reset the game
  const initializeGame = () => {
    const cardNumbers = Array.from({ length: totalPairs }, (_, i) => i + 1);
    const pairedNumbers = [...cardNumbers, ...cardNumbers];
    const shuffledCards = pairedNumbers.sort(() => Math.random() - 0.5).map((cardNum, index) => ({
      id: index,
      carNumber: cardNum,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffledCards);
    setFlipCount(0);
    setFlippedIndices([]);
  };

  // initialize cards on mount
  useEffect(() =>{
    initializeGame();
  },[]);

  // reset game if all pairs are matches or max flip is reached
useEffect(() => {
  if (cards.length > 0 && cards.every(card => card.isMatched)) {
    setMsgColor('white');
    setBgColor('green');
    setMsg('Bravo! You matched all cards!');
    setTimeout(() => {
      initializeGame();
      setMsgColor('');
      setMsg('');
    }, 2000);
  } else if (flipCount > maxFlip) {
    setMsgColor('white');
    setBgColor('red');
    setMsg('Game Over! You exhausted your slots. Try again');
    setTimeout(() => {
      initializeGame();
      setMsgColor('');
      setMsg('');
    }, 2000);
  }
}, [flipCount, cards, maxFlip]);



// flipping cards on click
const handleCardFlip = (index: number) => {
  
  if (cards[index].isFlipped || cards[index].isMatched) {
    setMsgColor('white');
    setBgColor('red')
    setMsg('Already flipped!');
    setTimeout(() => {
      setMsgColor('');
      setMsg('');
    }, 2000);
    return;
  }else if(flippedIndices.length === 2){
    return;
  }


  const newFlippedIndices = [...flippedIndices, index];
  setFlippedIndices(newFlippedIndices);
  setFlipCount((flipCount) => flipCount + 1);

  const updatedCards = cards.map((card, i) =>
    i === index ? { ...card, isFlipped: true } : card
  );
  setCards(updatedCards);

  if (newFlippedIndices.length === 2) {
    const [firstIndex, secondIndex] = newFlippedIndices;

    if (cards[firstIndex].carNumber === cards[secondIndex].carNumber) {
      // If matched, set cards to matched and clear indices
      setCards((previousCards) =>
        previousCards.map((card, i) =>
          i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
        )
      );
      setBgColor('green');
      setMsgColor('white');
      setMsg('Matched! Great work!');
      setTimeout(() => {
        setMsgColor('');
        setMsg('');
      }, 2000);
    } else {
      // If not matched, flip cards back over after delay
      setTimeout(() => {
        setCards((previousCards) =>
          previousCards.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          )
        );
      }, 1000);
    }

    // Clear flipped indices
    setFlippedIndices([]);
  }
};


  return(
    <section  className=" relative w-full h-screen">
      <header className="flex items-center justify-center space-x-3">
        <h3 className="text-2xl font-semibold">Flip Count</h3>
        <span className="rounded-2xl bg-black text-white px-3 text-m">{flipCount}/{maxFlip}</span>
        <span className="bg-green-600 text-white px-3 text-xl rounded-2xl">Easy</span>
      </header>

      {/* display message to the user */}
      {msg && <div className=" absolute top-20 w-full text-center  mx-auto  my-3 -ml-7 text-xl px-3 py-2">
        <p className={`w-max mx-auto py-1 px-3 bg-${bgColor}-600 text-${msgColor} rounded`}>{msg}</p>
      </div>}

      <div className="w-6/12 mt-20 py-10 mx-auto flex items-center justify-start flex-wrap">
      {cards.map((card) => (
        <Card
          key={card.id}
          carNumber={card.carNumber}
          className="shrink-0 w-45 m-1"
          isFlipped = {card.isFlipped || card.isMatched}
          onClick={() => handleCardFlip(card.id)}
        />
      ))}
      </div>

    </section>
  )
}

export default Game;