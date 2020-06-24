import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(`${window.Params.URL_API}/contas`)
    return {
        type: 'CONTAS_FETCHED',
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
        axios[method](`${window.Params.URL_API}/contas/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(conta) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('contaForm', conta)
    ]
}

export function showDelete(conta) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('contaForm', conta)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('contaForm', INITIAL_VALUES)
    ]
}