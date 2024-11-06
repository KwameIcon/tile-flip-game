import die from '../assets/image-removebg-preview.png';


interface CardProps {
    carNumber:number;
    isFlipped: boolean;
    onClick: ()=>void;
    className?: string;
}


const Card: React.FC<CardProps> = ({carNumber, isFlipped, onClick, className}) =>{

    return(
        <div className= {` w-2/12 h-32 bg-white shadow-md cursor-pointer flex items-center justify-center ${className}`} onClick={onClick}>
            {!isFlipped ? (<div>
                <img src= {die} alt="die" />
            </div>)
            :
            (<div className='text-5xl text-center'>{carNumber}</div>)
            }
        </div>
    )
}

export default Card;