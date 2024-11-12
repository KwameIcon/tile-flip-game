import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {


    const navigate = useNavigate();

    const handleGameNavigation = (level: string) =>{
        navigate({
            pathname: '/game',
            search: `?level=${level}`
        });
    }

    return(
        <section className="w-full h-screen flex justify-center items-center">
            <div className="w-full sm:w-full lg:w-2/4 h-screen sm:h-screen lg:h-2/4 flex flex-col justify-center items-center">
                <h1 className="text-4xl sm:text-4xl lg:text-5xl opacity-80 font-bold mb-10">Tile Reveal Game</h1>
                <h2 className="text-3xl sm:text-3xl lg:text-4xl font-normal opacity-75 mb-3">Select difficulty</h2>

                {/* difficulty */}
                <div>
                    <button type="button" className="py-2 px-5 text-white bg-green-600 mx-1 rounded hover:bg-green-700" onClick={() => handleGameNavigation('easy')}>Easy</button>
                    <button type="button" className="py-2 px-5 bg-yellow-600 mx-1 rounded hover:bg-yellow-700" onClick={() => handleGameNavigation('medium')}>Medium</button>
                    <button type="button" className="py-2 px-5 text-white bg-red-600 mx-1 rounded hover:bg-red-700" onClick={() => handleGameNavigation('hard')}>Hard</button>
                </div>
            </div>
        </section>
    )
}

export default Home;