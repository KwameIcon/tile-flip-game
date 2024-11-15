import { useEffect, useState } from "react";
import Card from "../components/card";
import GameResults from "../components/modals/gameResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import StartGame from "../components/modals/startGameModal";
import ConfirmGameExit from "../components/modals/confirmGameExit";
import UserGuide from "../components/modals/userGuide";

// utils
import { startCountDown } from "../utils/startCountDown";
import { initializeGame } from "../utils/initializeGame";
import { EndGame } from "../utils/endGame";
import { FlipCards } from "../utils/flipCards";

// sounds
import mismatchSound from '../assets/sounds/error-126627.mp3';
import matchSound from '../assets/sounds/matched.wav';
import backgroundSound from '../assets/sounds/relaxing-guitar-loop-v5-245859.mp3';
import gameWon from '../assets/sounds/brass-fanfare-reverberated-146263.mp3'
import gameOver from '../assets/sounds/videogame-death-sound-43894.mp3';


// type states
interface CardProps {
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

  // states
  const [cards, setCards] = useState<CardProps[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [flipCount, setFlipCount] = useState(0);
  const [maxFlip, setMaxFlip] = useState<number>(40);
  const [scores, setScores] = useState(0);
  const [msg, setMsg] = useState('');
  const [msgBgColor, setMsgBgColor] = useState('');
  const [startGameMessage, setStartGameMessage] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isStartGame, setIsStartGame] = useState(false);
  const [isQuitting, setIsQuitting] = useState(false);
  const [hasSeen, setHasSeen] = useState(true);
  const [modalMessage, setModalMessage] = useState<ModalMessages>({});
  const [restart, setRestart] = useState(false);
  const [time, setTime] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // retrieve game level from url parameter
  const [searchParam] = useSearchParams();
  const level = searchParam.get('level');



  // sounds
  const match = new Audio(matchSound);
  const notMatch = new Audio(mismatchSound);
  const bgSound = new Audio(backgroundSound);
  const gameWonSound = new Audio(gameWon);
  const gameOverSound = new Audio(gameOver);


 
//  itialize game
  useEffect(() => {
    initializeGame({setCards, setFlipCount, setFlippedIndices, setIsGameComplete, setMsg, setModalMessage, setMaxFlip, level});
      setRestart(false);
      setScores(0)
  }, [level, restart]);



  // dynamically display start game modal message based on game level and timer
   useEffect(() => {
    let countdownInterval: any = null;
    let hasSeenMessage = localStorage.getItem('hasSeen');
    if (!hasSeenMessage) {
      setHasSeen(false);
      localStorage.setItem('hasSeen', 'true');
    }
    if (level === 'easy') {
      setStartGameMessage('Test Your Memory, Match the Tiles!');
    } else if (level === 'medium') {
      if (isStartGame && !isGameComplete && hasSeen) {
        countdownInterval = startCountDown(5, 0, setTime);
      }
      setStartGameMessage('Challenge Yourself, Step Up the Game!');
    } else {
      if (isStartGame && !isGameComplete && hasSeen) {
        countdownInterval = startCountDown(3, 30, setTime);
      }
      setStartGameMessage('Ultimate Test, Master Your Memory!');
    }
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      setTime(''); 
    };
  }, [level, hasSeen, isGameComplete, isStartGame, setTime, setHasSeen,]);




// control background sound
  useEffect(() => {
    if(!isGameComplete && isStartGame && !isMuted){
      bgSound.loop = true;
      bgSound.play();
    }
    return(() => {
      bgSound.pause();
      bgSound.currentTime = 0;
    })
  },[isStartGame, isGameComplete, isMuted]);


  

  // Check game completion based on flips and matched cards
  useEffect(() => {
    EndGame({setModalMessage, cards, scores, flipCount, gameWonSound, gameOverSound, setIsGameComplete, setIsStartGame, maxFlip, time, level});
  }, [flipCount, cards, maxFlip, time]);


// handle card flips
  const handleCardFlip = (index: number) => {
    FlipCards({cards, index, flippedIndices, setFlippedIndices, setFlipCount, setCards, setScores, match, setMsg, setMsgBgColor, notMatch});
  };


// jsx
  return (
    <div style={{ backgroundColor: '#faf3f3', scrollbarWidth: 'none' }} className="w-screen h-screen overflow-y-auto overflow-x-hidden flex items-center justify-start flex-col p-2 relative">

      {/* header */}
      <header className="w-screen flex flex-col items-center">
        <h1 className="w-screen overflow-hidden text-center text-4xl opacity-80 font-bold mb-4">Tile Reveal Game</h1>
        <div className="grid grid-cols-3 gap-2 sm:grid sm:grid-cols-3 sm:gap-2 lg:flex lg:items-center lg:justify-center lg:space-x-2 sm:space-x-5 bg-green-600 p-2">
          <div className="text-center text-xl cursor-pointer" onClick={() => {setIsQuitting(true)}} >
            <FontAwesomeIcon icon={faArrowCircleLeft}/>
          </div>
          <h3 className=" flex items-center justify-center space-x-1">
            <p className="text-xl sm:text-xl lg:text-2xl font-bold text-white">Flips</p>
            <span className="px-2 py-1 bg-black text-white text-center rounded-2xl">{flipCount}/{maxFlip}</span>
          </h3>
          <div className={`px-2 py-1 bg-white text-green-600 rounded-xl text-xl text-center`}>{scores}</div>
          <div className="px-1 py-1 bg-white text-green-600 rounded-xl text-xl text-center">{level}</div>
          {time && <div className="px-1 py-1 bg-white text-green-600 rounded-xl text-xl text-center">{time}</div>}
          <div className="px-1 py-1 bg-white text-green-600 rounded-xl text-xl text-center">
            {
              isMuted ? 
                (<FontAwesomeIcon icon={faVolumeMute} onClick={() => setIsMuted((prev) => !prev)} className="cursor-pointer"/> ) 
              :
                (<FontAwesomeIcon icon={faVolumeUp} onClick={() => setIsMuted((prev) => !prev)} className="cursor-pointer"/>)
            }
          </div>
        </div>
      </header>

      {/* display messages */}
      <div className="absolute top-28 w-screen text-center mt-3 text-xl">
        <p className={`w-max mx-auto px-3 bg-${msgBgColor}-600 bg-opacity-80 text-white rounded  `}>{msg}</p>
      </div>

      {/* cards section */}
      <div className="w-screen sm:w-screen lg:w-3/6 m-auto mt-8 grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 relative -ml-2 lg:ml-auto p-2">
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


      {/* modals */}
      {(!isStartGame && !isGameComplete) && <StartGame setIsStartGame = {setIsStartGame} startMessage = {startGameMessage}/>}
      {isGameComplete && <GameResults {...modalMessage} setRestart={setRestart} setIsGameComplete={setIsGameComplete} setIsStartGame = {setIsStartGame}/>}
      {isQuitting && <ConfirmGameExit setIsQuitting = {setIsQuitting}/>}
      {(!hasSeen && isStartGame) ? <UserGuide setHasSeen = {setHasSeen}/> : ''}


    </div>
  );
};

export default Game;
