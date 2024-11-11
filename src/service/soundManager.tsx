import { Howl } from "howler";

const sounds: {[key: string]: Howl} = {
    match: new Howl({src: ['../assets/matched.wav']}),
    mismatch: new Howl({src: ['../assets/error-126627.mp3']}),
    bgMusic: new Howl({src: ['../assets/relaxing-guitar-loop-v5-245859.mp3']})
};

export const playSound = (sound: string): void => {
    if(sounds[sound]){
        sounds[sound].play();
    }
};

export const playBgMusic = (): void => {
    sounds.bgMusic.play();
}

export const stopBackgroundMusic = (): void => {
  sounds.bgMusic.stop();
};
