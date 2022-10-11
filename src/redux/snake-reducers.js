import { getRandomInt } from "../utils/random";

const MOVE = "MOVE";
const CHANGE_DIRECTION = "CHANGE-DIRECTION";
const GROWING = "GROWING";
const CREATE_BONUS = "CREATE-BONUS";
const TOGGLE_LOOSING = "TOGGLE-LOOSING"
const RESTART = "RESTART";
const TOGGLE_PAUSE = "TOGGLE-PAUSE";
const START_TIMER = "START_TIMER";
const CODE_DIRECTION = {
    up: -1, down: 1, left: -2, right: 2
}

let initialState = {
    snake: [{ coordinateX: 1, coordinateY: 4 }, { coordinateX: 1, coordinateY: 3 }, { coordinateX: 1, coordinateY: 2 }],
    direction: CODE_DIRECTION.down,
    isGrowing: false,
    bonus: null,
    isLoose: false,
    isPause: false,
    score: 0,
    timer: { minutes: 0, seconds: 0, milliseconds: 0 }
}

const snakeReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DIRECTION:
            if (action.direction !== state.direction && action.direction !== -state.direction) {
                return {
                    ...state, direction: action.direction
                }
            }
            return state
        case MOVE:
            const { coordinateX, coordinateY } = state.snake[0];
            const snakeLength = state.snake.length;
            const currentDirection = state.direction;
            let newCellSnake;
            if (currentDirection === CODE_DIRECTION.down) {
                newCellSnake = { coordinateX: coordinateX, coordinateY: coordinateY + 1 };
            }
            else if (currentDirection === CODE_DIRECTION.right) {
                newCellSnake = { coordinateX: coordinateX + 1, coordinateY: coordinateY };
            }
            else if (currentDirection === CODE_DIRECTION.left) {
                newCellSnake = { coordinateX: coordinateX - 1, coordinateY: coordinateY };
            }
            else if (currentDirection === CODE_DIRECTION.up) {
                newCellSnake = { coordinateX: coordinateX, coordinateY: coordinateY - 1 };
            }
            if (coordinateX === state.bonus.coordinateX && coordinateY === state.bonus.coordinateY) {
                return {
                    ...state, score: state.score + 1, bonus: { coordinateX: getRandomInt(1, 20), coordinateY: getRandomInt(1, 20) }, isGrowing: false, snake: [newCellSnake, ...state.snake]
                }
            }
            return {
                ...state, snake: [newCellSnake, ...state.snake.filter((cell, index) => index !== snakeLength - 1)]
            }
        case GROWING:
            createBonus();
            return {
                ...state, isGrowing: true
            }
        case CREATE_BONUS:
            return {
                ...state, bonus: { coordinateX: getRandomInt(1, 20), coordinateY: getRandomInt(1, 20) }
            }
        case TOGGLE_LOOSING:
            return {
                ...state, isLoose: action.isLoosing
            }
        case RESTART:
            return {
                ...initialState, snake: [{ coordinateX: 1, coordinateY: 4 }, { coordinateX: 1, coordinateY: 3 }, { coordinateX: 1, coordinateY: 2 }]
            }
        case TOGGLE_PAUSE:
            return {
                ...state, isPause: action.isPause
            }
        case START_TIMER: {
            let newMilliseconds = state.timer.milliseconds + 1;
            let newSeconds = state.timer.seconds;
            let newMinutes = state.timer.minutes;
            if (newMilliseconds > 9) {
                newSeconds++;
                newMilliseconds = 0;
            }
            if (newSeconds > 59) {
                newMinutes++;
                newSeconds = 0;
            }
            return {
                ...state, timer: { minutes: newMinutes, seconds: newSeconds, milliseconds: newMilliseconds }
            }
        }
        default:
            return state
    }
}

export const move = () => {
    return { type: MOVE }
}

export const changeDirection = (directionCode) => {
    return { type: CHANGE_DIRECTION, direction: directionCode }
}

export const growing = () => {
    return { type: GROWING }
}

export const createBonus = () => {
    return { type: CREATE_BONUS }
}

export const toggleLoosing = (loosingStatus) => {
    return { type: TOGGLE_LOOSING, isLoosing: loosingStatus }
}

export const restart = () => {
    return { type: RESTART }
}

export const pause = (isPause) => {
    return { type: TOGGLE_PAUSE, isPause }
}

export const startTimer = () => {
    return { type: START_TIMER }
}

export { snakeReducers }