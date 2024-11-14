
interface ModalMessages {
  title?: string;
  subTitle?: string;
  actionText?: string;
  textColor?: string;
}


interface GameProps {
  id: number;
  frontImage: string;
  backImage: string;
  isFlipped: boolean;
  isMatched: boolean;
}


interface GameResultsProps {
  setModalMessage:React.Dispatch<React.SetStateAction<ModalMessages>>
  cards: GameProps[];
  scores: number;
  flipCount: number;
  gameWonSound: HTMLAudioElement;
  gameOverSound: HTMLAudioElement;
  setIsGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  maxFlip: number;
  time: string;
  level:string | null;
}


export const EndGame = ({setModalMessage, cards, scores, flipCount, gameWonSound, gameOverSound, setIsGameComplete, setIsStartGame, maxFlip, time, level}:GameResultsProps): void => {

    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      if(level === 'easy'){
        setModalMessage({
          title: "Woo-hoo! 🎉 Easy Level Champion!",
          subTitle: `You scored ${scores} 🏅 in ${flipCount} flips. You breezed through Easy like a champ! 💪 It’s time to leave the kiddie pool and dive into something a little more daring. Are you ready to go harder? 😜`,
          actionText: 'Start a new game',
          textColor: 'green',
        });
      }else if(level === 'medium'){
        setModalMessage({
          title: "Nice Work, Medium Master! 🎯",
          subTitle: `You scored ${scores} 🏅 in ${flipCount} flips. You conquered Medium like a pro! 🏆 Now that you’re warming up, 😅 Let’s see if you can handle the heat!" 🔥`,
          actionText: 'Start a new game',
          textColor: 'green',
        });
      }else{
        setModalMessage({
          title: "Game Champ! 🏆",
          subTitle: `Score: ${scores} 🏅 in ${flipCount} flips. You might just be tougher than the game! 💪`,
          actionText: 'Start a new game',
          textColor: 'green',
        });
      }
      gameWonSound.play();
      setIsGameComplete(true);
      setIsStartGame(false);
    } else if (flipCount >= maxFlip) {
      if(level === 'easy'){
        setModalMessage({
          title: "Oops! Almost Had It! 😅",
          subTitle: `Easy level got you this time, but don’t worry—champions never give up! Ready to try again?. You scored ${scores} 🏅`,
          actionText: 'Try again',
          textColor: 'red',
        });
      }else if(level === 'medium'){
        setModalMessage({
          title: "So Close! Almost There! 🙈",
          subTitle: `Medium level put up a fight, but you're tougher! Ready to show it who's boss?. You scored ${scores} 🏅`,
          actionText: 'Try again',
          textColor: 'red',
        });
      }else{
        setModalMessage({
          title: "Epic Battle! 💥",
          subTitle: `The hard level gave its best shot—but so did you! Want to go for a rematch?. You scored ${scores} 🏅`,
          actionText: 'Try again',
          textColor: 'red',
        });
      }
      gameOverSound.play();
      setIsGameComplete(true);
    }else if(time === 'Timeout!'){
      setModalMessage({
        title: "Game Over!",
        subTitle: `You run out of time. You scored ${scores} 🏅`,
        actionText: 'Try again',
        textColor: 'red',
      });
      gameOverSound.play();
      setIsGameComplete(true);
    }
}