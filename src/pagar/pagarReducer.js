const INITIAL_STATE = {list: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PAGARS_FETCHED':
            return { ...state, list: action.payload.data }
        case 'PESSOAS_FETCHED':
            return { ...state, pessoas: action.payload.data }
        default:
            return state
    }
}