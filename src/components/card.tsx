

interface CardProps {
    id:number;
    frontImage: string;
    backImage: string;
    isFlipped: boolean;
    onClick: () => void;
}


const Card: React.FC<CardProps> = ({id, frontImage, backImage, isFlipped, onClick}) => {

    return(
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }} className='w-6/6 sm:w-6/6 lg:w-32 h-32 my-2 overflow-hidden border border-box shrink-0 bg-white hover: cursor-pointer' onClick={onClick}>
            {!isFlipped ? (<div className="w-full h-full">
                <img src= {frontImage} alt="Front"  className="w-full h-full object-cover"/>
            </div>)
            :
            (<div className="w-full h-full">
                <img src= {backImage} alt="Back"  className="w-full h-full object-cover"/>
            </div>)}
        </div>
    )
}

export default Card;