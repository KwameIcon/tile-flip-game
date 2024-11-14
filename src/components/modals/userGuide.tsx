import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

interface GuideProps{
    setHasSeen: React.Dispatch<React.SetStateAction<boolean>>
}

const Guide: React.FC<GuideProps> = ({setHasSeen}) => {

    const removeMessage = () => {
        setHasSeen(true);
        localStorage.setItem('hasSeen', 'true')
    }

    return(
        <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-11/12 sm:w-11/12 lg:w-5/12 m-auto bg-black bg-opacity-70 text-white shadow-xl flex items-center justify-center p-5 rounded relative">
                <FontAwesomeIcon icon={faTimesCircle} className="absolute -top-10 sm:-top-7 lg:-top-5 right-1 sm:right-1 lg:-right-5 text-black text-3xl cursor-pointer animate-bounce shadow-2xl" onClick = {removeMessage}/>
                <p className="font-bold text-white opacity-80">
                    Think fast, focus, and flip! Match all the flags before your turns run out—can you conquer the board?
                </p>
            </div>
        </div>
    )
}

export default Guide;