import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'
import Item from '../item/item'
import Pessoa from '../pessoa/pessoa'
import Conta from '../conta/conta'
import CategoriaFinanceira from '../categoriaFinanceira/categoriaFinanceira'
import Receber from '../receber/receber'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='/itens' component={Item} />
            <Route path='/pessoas' component={Pessoa} />
            <Route path='/contas' component={Conta} />
            <Route path='/categoriaFinanceiras' component={CategoriaFinanceira} />
            <Route path='/recebers' component={Receber} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)