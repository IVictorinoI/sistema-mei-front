import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './receberActions'

class ReceberList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(bc => (
            <tr key={bc._id}>
                <td>{bc.descricao}</td>
                <td>{bc.pessoa.nome}</td>
                <td>{bc.dataEmissao}</td>
                <td>{bc.dataVencimento}</td>
                <td>{bc.valor}</td>
                <td>{bc.valorRecebido}</td>
                <td>{bc.status}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Pessoa</th>
                            <th>Emissão</th>
                            <th>Vencimento</th>
                            <th>Valor</th>
                            <th>Recebido</th>
                            <th>Status</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.receber.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ReceberList)