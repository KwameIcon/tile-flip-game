import { faFrown, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


interface ConfirmGameProps{
    setIsQuitting: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmCard: React.FC<ConfirmGameProps> = ({setIsQuitting}) => {

    const navigate = useNavigate();

    const handleGameQuit = (state: string) => {
        if(state === 'quit'){
            navigate(-1);
        }
        if(state === 'play'){
            setIsQuitting(false);
        }
    }

    return(
        <div className=" fixed top-0 w-full h-screen bg-black bg-opacity-90 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-around bg-white w-11/12 sm:w-11/12 lg:w-6/12 h-2/5 m-auto rounded">
                <p className="text-3xl sm:text-3xl lg:text-4xl text-center font-bold uppercase mb-5">Are you sure you want to quit?</p>
                <div className="mt-2 flex items-center justify-center space-x-10">
                    <button onClick={() => handleGameQuit('quit')} className="py-2 px-3 bg-red-600 text-white text-xl flex items-center space-x-2 rounded hover:bg-red-700">
                        <span>Yes</span>
                        <FontAwesomeIcon icon={faFrown}/>
                    </button>
                    <button onClick={() => handleGameQuit('play')} className="py-2 px-3 bg-green-600 text-white text-xl flex items-center space-x-2 rounded hover:bg-green-700">
                        <span>NO</span>
                        <FontAwesomeIcon icon={faSmile}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmCard;