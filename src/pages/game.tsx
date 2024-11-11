import { useEffect, useState } from "react";
import Card from "../components/card";
import { CARDSDATA, HIDDENIMAGES } from "../service/CARDSDATA";
import Modal from "../components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import mismatchSound from '../assets/error-126627.mp3';
import matchSound from '../assets/matched.wav';

interface GameProps {
  id: number;
  frontImage: string;
  backImage: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface ModalMessages {
  title?: string;
  subTitle?: string;
  actionText?: string;
  textColor?: string;
}

const Game: React.FC = () => {
  const [cards, setCards] = useState<GameProps[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [flipCount, setFlipCount] = useState(0);
  const [maxFlip, setMaxFlip] = useState<number>(40);
  const [scores, setScores] = useState(0);
  const [msg, setMsg] = useState('');
  const [msgColor, setMsgColor] = useState('');
  const [msgBgColor, setMsgBgColor] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [modalMessage, setModalMessage] = useState<ModalMessages>({});
  const [restart, setRestart] = useState(false);

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const level = searchParam.get('level');

  // sounds
  const match = new Audio(matchSound);
  const notMatch = new Audio(mismatchSound);

  // Initialize or reset the game cards and settings based on level
  const initializeGame = () => {
    const pairedCards = [...CARDSDATA, ...CARDSDATA].map((card) => ({
      id: card.id,
      frontImage: card.frontImage,
      backImage: card.backImage,
      isFlipped: false,
      isMatched: false,
    }));
    const shuffleHiddenImages = [...HIDDENIMAGES, ...HIDDENIMAGES].sort(() => Math.random() - 0.5);
    pairedCards.forEach((card, i) => (card.backImage = shuffleHiddenImages[i]));
    setCards(pairedCards);
    setFlipCount(0);
    setFlippedIndices([]);
    setIsGameComplete(false);
    setMsg('');
    setModalMessage({});
    setMaxFlip(level === 'easy' ? 45 : level === 'medium' ? 35 : 30);
  };

 
  useEffect(() => {
    initializeGame();
  }, [level]);

  // Check game completion based on flips and matched cards
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setModalMessage({
        title: "Congratulations, you've won!",
        subTitle: `You scored ${scores} in ${flipCount} flips`,
        actionText: 'Start a new game',
        textColor: 'green',
      });
      setIsGameComplete(true);
    } else if (flipCount >= maxFlip) {
      setModalMessage({
        title: "Game Over!",
        subTitle: `Flip limit exceeded for this round`,
        actionText: 'Try again',
        textColor: 'red',
      });
      setIsGameComplete(true);
    }
  }, [flipCount, cards, maxFlip]);

  // Reset game if restart is triggered
  useEffect(() => {
    if (restart) {
      initializeGame();
      setRestart(false);
      setScores(0)
    }
  }, [restart]);

  const handleCardFlip = (index: number) => {
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
        }, 1000);
      }
      setFlippedIndices([]);
    }
  };

  return (
    <div style={{ backgroundColor: '#faf3f3' }} className="w-screen h-full flex items-center justify-start flex-col p-2 relative">
      <header>
        <h1 className="text-4xl opacity-80 font-bold mb-4 ml-7">Tile Reveal Game</h1>
        <div className="flex items-center justify-center space-x-10">
          <FontAwesomeIcon icon={faArrowCircleLeft} className="text-xl cursor-pointer" onClick={() => {navigate(-1)}} />
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-medium">Flip Count</h3>
            <div className="px-2 py-1 bg-black text-white rounded-2xl">{flipCount}/{maxFlip}</div>
            <div className={`px-2 py-1 bg-${scores === 0 ? 'red' : 'green'}-600 text-white rounded-xl text-xl`}>{scores}</div>
            <div className="px-1 py-1 bg-green-600 text-white rounded-xl text-xl">{level}</div>
          </div>
        </div>
      </header>
      <div className="absolute top-20 w-full text-center mt-3 text-xl">
        <p className={`w-max mx-auto px-3 bg-${msgBgColor}-600 text-white rounded`}>{msg}</p>
      </div>
      <div className="w-3/6 m-auto mt-5 flex flex-wrap space-x-2 justify-center items-start">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={card.id}
            frontImage={card.frontImage}
            backImage={card.backImage}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardFlip(index)}
          />
        ))}
      </div>
      {isGameComplete && <Modal {...modalMessage} setRestart={setRestart} setIsGameComplete={setIsGameComplete} />}
    </div>
  );
};

export default Game;
