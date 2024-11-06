import {useNavigate} from 'react-router-dom';


const Home: React.FC = () => {

    const navigate = useNavigate();

    return (
        <section className="w-1/2 m-auto flex items-center flex-col">
            <h1 className="text-5xl text-black-300 opacity-80 font-bold mb-10">Tile Reveal Game</h1>
            <h2 className=" text-4xl font-medium mb-5 opacity-70">Select difficulty</h2>
            <ul className=" flex items-center space-x-2 space-x-3 mt-1">
                <li className=" w-auto rounded p-2 hover: cursor-pointer hover:bg-green-600 text-white px-3 bg-green-500" onClick = {() => navigate('/flip-game')}>Easy</li>
                <li className=" w-auto rounded p-2 hover: cursor-pointer hover:bg-yellow-600 px-3 bg-yellow-500">Medium</li>
                <li className=" w-auto rounded p-2 hover: cursor-pointer hover:bg-red-600 text-white px-3 bg-red-500">Hard</li>
            </ul>
        </section>
    );
}

export default Home;
