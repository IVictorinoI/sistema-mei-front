import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'
import Item from '../item/item'
import Pessoa from '../pessoa/pessoa'
import Conta from '../conta/conta'
import CategoriaFinanceira from '../categoriaFinanceira/categoriaFinanceira'
import Receber from '../receber/receber'
import BaixaReceber from '../baixaReceber/baixaReceber'
import Pagar from '../pagar/pagar'
import BaixaPagar from '../baixaPagar/baixaPagar'
import Extrato from '../extrato/extrato'
import Venda from '../venda/venda'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='/itens' component={Item} />
            <Route path='/pessoas' component={Pessoa} />
            <Route path='/contas' component={Conta} />
            <Route path='/categoriaFinanceiras' component={CategoriaFinanceira} />
            <Route path='/recebers' component={Receber} />
            <Route path='/baixaRecebers' component={BaixaReceber} />
            <Route path='/pagars' component={Pagar} />
            <Route path='/baixaPagars' component={BaixaPagar} />
            <Route path='/extratos' component={Extrato} />
            <Route path='/vendas' component={Venda} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)