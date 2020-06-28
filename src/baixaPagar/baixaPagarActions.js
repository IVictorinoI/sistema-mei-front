import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {titulos: [{}]}

export function getList() {
    const request = axios.get(`${window.Params.URL_API}/baixaPagars?populate=titulos.pagar&sort=-_id`)
    return {
        type: 'BAIXAPAGARS_FETCHED',
        payload: request
    }
}

export function getPagars() {
    const request = axios.get(`${window.Params.URL_API}/pagars?status__ne=PAGO`)
    return {
        type: 'PAGARS_FETCHED',
        payload: request
    }
}

export function getContas() {
    const request = axios.get(`${window.Params.URL_API}/contas`)
    return {
        type: 'CONTAS_FETCHED',
        payload: request
    }
}

export function getCategoriaFinanceiras() {
    const request = axios.get(`${window.Params.URL_API}/categoriaFinanceiras`)
    return {
        type: 'CATEGORIAFINANCEIRAS_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''

        const newValues = Object.assign({}, values, {
            conta: values.conta._id,
            categoriaFinanceira: values.categoriaFinanceira._id,
            titulos: values.titulos.filter(p => p.pagar).map(p => {
                return Object.assign({}, p, {
                    pagar: p.pagar._id
                })
            })
        })

        axios[method](`${window.Params.URL_API}/baixaPagars/${id}`, newValues)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(baixaPagar) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('baixaPagarForm', baixaPagar)
    ]
}

export function showDelete(baixaPagar) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('baixaPagarForm', baixaPagar)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('baixaPagarForm', INITIAL_VALUES)
    ]
}

