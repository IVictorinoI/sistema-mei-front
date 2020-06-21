import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'> 
            <MenuItem path='itens' label='Itens' icon='usd' />
            <MenuItem path='pessoas' label='Pessoas' icon='usd' />
        </MenuTree>
    </ul>
)