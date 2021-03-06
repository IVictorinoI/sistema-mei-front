import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {titulos: [{}]}

export function getList() {
    const request = axios.get(`${window.Params.URL_API}/baixaRecebers?populate=conta&populate=categoriaFinanceira&populate=titulos.receber&sort=-_id`)
    return {
        type: 'BAIXARECEBERS_FETCHED',
        payload: request
    }
}

export function getRecebers() {
    const request = axios.get(`${window.Params.URL_API}/recebers?status__ne=PAGO`)
    return {
        type: 'RECEBERS_FETCHED',
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
            titulos: values.titulos.filter(p => p.receber).map(p => {
                return Object.assign({}, p, {
                    receber: p.receber._id
                })
            })
        })

        axios[method](`${window.Params.URL_API}/baixaRecebers/${id}`, newValues)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(baixaReceber) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('baixaReceberForm', baixaReceber)
    ]
}

export function showDelete(baixaReceber) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('baixaReceberForm', baixaReceber)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('baixaReceberForm', INITIAL_VALUES)
    ]
}

