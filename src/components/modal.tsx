import React from "react";
import { useNavigate } from "react-router-dom";

interface modalProps{
    title?: string;
    subTitle?: string;
    actionText?: string;
    textColor?: string;
    setRestart: React.Dispatch<React.SetStateAction<boolean>>;
    setIsGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<modalProps> = ({title, subTitle, actionText, textColor, setRestart, setIsGameComplete}) => {

    const navigate = useNavigate();

    const handleGameRestart = () =>{
        if(textColor === 'red'){
            setIsGameComplete(false);
            setRestart(true);
        }else{
            navigate(-1);
        }
    }

    return(
        <div className=" fixed top-0 w-full h-screen bg-black bg-opacity-90 flex flex-col items-center justify-center">
            <h1 className={`text-${textColor}-500 text-7xl capitalize font-bold my-2`}>{title}</h1>
            <p className="text-2xl text-white mt-3">{subTitle}</p>
            <button className={`mt-3 py-2 px-3 ${textColor ==='red' ? 'bg-black' : 'bg-green-500'} text-white rounded`} onClick={handleGameRestart}>{actionText}</button>
        </div>
    )
}

export default Modal;