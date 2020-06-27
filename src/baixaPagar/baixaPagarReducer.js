const INITIAL_STATE = {list: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BAIXAPAGARS_FETCHED':
            return { ...state, list: action.payload.data }
        case 'PAGARS_FETCHED':
            return { ...state, pagars: action.payload.data }
        default:
            return state
    }
}