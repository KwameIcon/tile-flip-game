import React from "react";
import { useNavigate } from "react-router-dom";
import winBackgroundImage from '../../assets/images/endGame/confetti.gif';
import loseBackgroundImage from '../../assets/images/endGame/gamelost.gif';

interface modalProps{
    title?: string;
    subTitle?: string;
    actionText?: string;
    textColor?: string;
    setRestart: React.Dispatch<React.SetStateAction<boolean>>;
    setIsGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
    setIsStartGame:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<modalProps> = ({title, subTitle, actionText, textColor, setRestart, setIsGameComplete, setIsStartGame}) => {

    const navigate = useNavigate();

    const handleGameRestart = () =>{
        if(textColor === 'red'){
            setIsGameComplete(false);
            setRestart(true);
            setIsStartGame(true);
        }else{
            setIsStartGame(false);
            navigate(-1);
        }
    }

    return(
        <div style={{backgroundImage: textColor !== 'red' ? `url(${winBackgroundImage})` : `url(${loseBackgroundImage})`}} className=" fixed top-0 w-full h-screen bg-black bg-opacity-90 bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center p-2">
            <div className="absolute w-screen h-screen z-1 bg-black mix-blend-overlay "/>
            <div className="absolute lg:w-11/12 h-screen z-10 flex flex-col items-center justify-center">
                <h1 className={`text-${textColor}-500 text-5xl sm:text-5xl lg:text-7xl text-center capitalize font-bold my-2`}>{title}</h1>
                <p className={` lg:w-3/4 text-2xl text-white text-center mt-3 rounded`}>{subTitle}</p>
                <button className={`mt-3 py-2 px-3 ${textColor ==='red' ? 'bg-black border border-red-600' : 'bg-green-500'} text-white rounded`} onClick={handleGameRestart}>{actionText}</button>
            </div>
        </div>
    )
}

export default Modal;