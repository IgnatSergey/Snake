let milliseconds = 0;
let seconds = 0;

export const startTimer = () => {
    milliseconds++;

    if (milliseconds > 999) {
        seconds++;
        milliseconds = 0;
    }

    return { seconds, milliseconds }
}