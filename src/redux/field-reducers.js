const SET_FIELD = "SET-FIELD";
const TOGGLE_SHOW_FIELD = "TOGGLE_SHOW_FIELD";


let initialState = {
    fieldWidth: 20,
    fieldHeight: 20,
    field: [],
    isShowField: false,
}

const fieldReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_FIELD:
            const field = [];
            let id = 1
            for (let i = 1; i <= state.fieldHeight; i++) {
                for (let j = 1; j <= state.fieldWidth; j++) {
                    field.push({ coordinateX: j, coordinateY: i, id })
                    id++;
                }
            }
            return {
                ...state, field: field
            }
        case TOGGLE_SHOW_FIELD:
            return {
                ...state, isShowField: true
            }
        default:
            return state
    }
}

export const setField = () => {
    return { type: SET_FIELD }
}

export const toggleShowField = () => {
    return { type: TOGGLE_SHOW_FIELD }
}

export { fieldReducers }