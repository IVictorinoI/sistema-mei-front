import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='dashboard' />
        <MenuTree label='Cadastros' icon='edit'> 
            <MenuItem path='itens' label='Itens' icon='usd' />
            <MenuItem path='pessoas' label='Pessoas' icon='usd' />
            <MenuItem path='contas' label='Contas' icon='usd' />
            <MenuItem path='categoriaFinanceiras' label='Categorias' icon='usd' />
        </MenuTree>
        <MenuItem path='recebers' label='Contas a receber' icon='usd' />
        <MenuItem path='baixaRecebers' label='Recebimentos efetuados' icon='usd' />
        <MenuItem path='pagars' label='Contas a pagar' icon='usd' />
        <MenuItem path='baixaPagars' label='Pagamentos efetuados' icon='usd' />
        <MenuItem path='extratos' label='Extrato' icon='usd' />
        <MenuItem path='vendas' label='Venda' icon='usd' />
    </ul>
)