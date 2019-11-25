const randomBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DEFAULT_VOICE = 'Google UK English Male';

export {randomBetween, DEFAULT_VOICE};