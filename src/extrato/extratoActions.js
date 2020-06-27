import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(`${window.Params.URL_API}/extratos?populate=pessoa&populate=conta&populate=categoriaFinanceira`)
    return {
        type: 'EXTRATOS_FETCHED',
        payload: request
    }
}

export function getPessoas() {
    const request = axios.get(`${window.Params.URL_API}/pessoas`)
    return {
        type: 'PESSOAS_FETCHED',
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
            pessoa: values.pessoa._id,
            conta: values.conta._id,
            categoriaFinanceira: values.categoriaFinanceira._id
        })
        axios[method](`${window.Params.URL_API}/extratos/${id}`, newValues)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(extrato) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('extratoForm', extrato)
    ]
}

export function showDelete(extrato) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('extratoForm', extrato)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('extratoForm', INITIAL_VALUES)
    ]
}

