import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {itens: [{}]}

export function getList() {
    const request = axios.get(`${window.Params.URL_API}/vendas?populate=pessoa&populate=conta&populate=itens.item`)
    return {
        type: 'VENDAS_FETCHED',
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


export function getItens() {
    const request = axios.get(`${window.Params.URL_API}/itens`)
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

        const newValues = Object.assign({}, values, {
            pessoa: values.pessoa ? values.pessoa._id : null,
            conta: values.conta ? values.conta._id : null,
            itens: values.itens.filter(p => p.item).map(p => {
                return Object.assign({}, p, {
                    item: p.item._id
                })
            })
        })

        axios[method](`${window.Params.URL_API}/vendas/${id}`, newValues)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(venda) {
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('vendaForm', venda)
    ]
}

export function showDelete(venda) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('vendaForm', venda)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('vendaForm', INITIAL_VALUES)
    ]
}

