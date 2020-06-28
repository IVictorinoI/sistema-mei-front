import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(`${window.Params.URL_API}/pessoas?sort=-_id`)
    return {
        type: 'PESSOAS_FETCHED',
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
        axios[method](`${window.Params.URL_API}/pessoas/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(pessoa) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('pessoaForm', pessoa)
    ]
}

export function showDelete(pessoa) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('pessoaForm', pessoa)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('pessoaForm', INITIAL_VALUES)
    ]
}