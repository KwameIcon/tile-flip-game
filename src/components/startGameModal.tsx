
interface startGameProp {
    startMessage: string;
    setIsStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}


const StartGame: React.FC<startGameProp> = ( {startMessage, setIsStartGame} ) => {

    const handleGameStart = ( ) => {
        setIsStartGame(true);
    }

    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-95 flex flex-col items-center justify-center">
            <h1 className="text-3xl sm:text-3xl lg:text-4xl text-green-600 text-center font-bold uppercase">{startMessage}</h1>
            <p className="text-center text-white text-opacity-60 my-2 leading-5 w-full sm:w-full lg:w-3/6 text-xl">Click to start game</p>
            <button className="my-2 py-1 px-2 bg-green-600 text-xl text-white capitalize rounded" onClick={handleGameStart}>Start Game</button>
        </div>
    )
}

export default StartGame;