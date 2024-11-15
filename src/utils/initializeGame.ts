import { CARDSDATA, HIDDENIMAGES } from "../service/CARDSDATA";


interface CardProps {
  id: number;
  frontImage: string;
  backImage: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface InitializeGameProps {
  setCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  setFlipCount: React.Dispatch<React.SetStateAction<number>>;
  setFlippedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setIsGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setModalMessage: React.Dispatch<React.SetStateAction<{}>>;
  setMaxFlip: React.Dispatch<React.SetStateAction<number>>;
  level: string | null;
}


// Initialize or reset the game cards and settings based on level
export const initializeGame = ({setCards, setFlipCount, setFlippedIndices, setIsGameComplete, setMsg,
  setModalMessage, setMaxFlip, level,}: InitializeGameProps): void => {

  const cards = [...CARDSDATA].map((card) => ({
    id: card.id,
    frontImage: card.frontImage,
    backImage: card.backImage,
    isFlipped: false,
    isMatched: false,
  }));
  
  const shuffleHiddenImages = [...HIDDENIMAGES, ...HIDDENIMAGES].sort(() => Math.random() - 0.5);
  cards.forEach((card, i) => (card.backImage = shuffleHiddenImages[i]));
  
  setCards(cards);
  setFlipCount(0);
  setFlippedIndices([]);
  setIsGameComplete(false);
  setMsg('');
  setModalMessage({});
  setMaxFlip(level === 'easy' ? 45 : level === 'medium' ? 35 : 30);
};
