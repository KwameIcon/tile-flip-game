
export const startCountDown = (minutes: number, seconds: number, updateCallBack: React.Dispatch<React.SetStateAction<string>>) => {
    let totalSeconds = minutes * 60 + seconds;

    const interval = setInterval(() => {
        let min = Math.floor(totalSeconds / 60);
        let sec = totalSeconds % 60;

        let time;
        if(totalSeconds > 0){
            time = `${String(min).padStart(2, '0')} : ${String(sec).padStart(2, '0')}`;
            updateCallBack(time);
            totalSeconds--;
        }else{
            time = 'Timeout!';
            updateCallBack(time);
            clearInterval(interval)
        }

    }, 1000);

    return interval;
}