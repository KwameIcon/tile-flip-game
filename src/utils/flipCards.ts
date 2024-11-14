
interface GameProps {
  id: number;
  frontImage: string;
  backImage: string;
  isFlipped: boolean;
  isMatched: boolean;
}


interface FlipCardsProps {
//   setModalMessage:React.Dispatch<React.SetStateAction<ModalMessages>>
  cards: GameProps[];
  index: number;
  flippedIndices: number[];
  setFlippedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setFlipCount: React.Dispatch<React.SetStateAction<number>>;
  setCards: React.Dispatch<React.SetStateAction<GameProps[]>>;
  setScores: React.Dispatch<React.SetStateAction<number>>;
  match: HTMLAudioElement;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setMsgBgColor: React.Dispatch<React.SetStateAction<string>>;
  notMatch: HTMLAudioElement;
}


export const FlipCards = ({cards, index, flippedIndices, setFlippedIndices, setFlipCount, setCards, setScores, match, setMsg, setMsgBgColor, notMatch}: FlipCardsProps) => {
    if (cards[index]?.isFlipped || cards[index]?.isMatched || flippedIndices.length === 2) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    setFlipCount((count) => count + 1);

    // Flip card logic
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    // Check for matches if two cards are flipped
    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].backImage === cards[secondIndex].backImage) {
        setCards((prevCards) =>
          prevCards.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
          )
        );
        setScores((prev) => prev + 5);
        match.play();
        setMsg('Matched! Great work!');
        setMsgBgColor('green');
        setTimeout(() => {
          setMsg('')
          setMsgBgColor('')
        },1000)
      } else {
        notMatch.play();
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) =>
              i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
        }, 500);
      }
      setFlippedIndices([]);
    }
}