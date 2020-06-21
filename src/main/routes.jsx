import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'
import Item from '../item/item'
import Pessoa from '../pessoa/pessoa'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='/itens' component={Item} />
            <Route path='/pessoas' component={Pessoa} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)