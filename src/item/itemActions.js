import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {credits: [{}], debts: [{}]}

export function getList() {
    const request = axios.get(`${window.Params.URL_API}/itens?sort=-_id`)
    return {
        type: 'ITENS_FETCHED',
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
        axios[method](`${window.Params.URL_API}/itens/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(item) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('itemForm', item)
    ]
}

export function showDelete(item) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('itemForm', item)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('itemForm', INITIAL_VALUES)
    ]
}