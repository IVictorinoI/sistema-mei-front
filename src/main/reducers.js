import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import AuthReducer from '../auth/authReducer'

import ItemReducer from '../item/itemReducer'
import PessoaReducer from '../pessoa/pessoaReducer'
import ContaReducer from '../conta/contaReducer'
import CategoriaFinanceiraReducer from '../categoriaFinanceira/categoriaFinanceiraReducer'
import ReceberReducer from '../receber/receberReducer'



const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer,

    item: ItemReducer,
    pessoa: PessoaReducer,
    receber: ReceberReducer,
    conta: ContaReducer,
    categoriaFinanceira: CategoriaFinanceiraReducer
})

export default rootReducer