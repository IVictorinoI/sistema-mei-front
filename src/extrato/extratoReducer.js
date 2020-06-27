const INITIAL_STATE = {list: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'EXTRATOS_FETCHED':
            return { ...state, list: action.payload.data }
        case 'PESSOAS_FETCHED':
            return { ...state, pessoas: action.payload.data }
        case 'CONTAS_FETCHED':
            return { ...state, contas: action.payload.data }
        case 'CATEGORIAFINANCEIRAS_FETCHED':
            return { ...state, categoriaFinanceiras: action.payload.data }
        default:
            return state
    }
}