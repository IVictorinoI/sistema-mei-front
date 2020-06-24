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
    </ul>
)