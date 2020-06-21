import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import ItemReducer from '../item/itemReducer'
import PessoaReducer from '../pessoa/pessoaReducer'
import AuthReducer from '../auth/authReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    item: ItemReducer,
    pessoa: PessoaReducer,
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer
})

export default rootReducer