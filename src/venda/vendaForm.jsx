import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import axios from 'axios'

import { init, getPessoas, getContas, getItens } from './vendaActions'
import LabelAndInput from '../common/form/labelAndInput'
import LabelAndFormSelect from '../common/form/labelAndFormSelect'
import ItemList from './itemList'

class VendaForm extends Component {
    componentDidMount() {
        this.props.getPessoas();
        this.props.getContas();
        this.props.getItens();
    }

    render() {
        const { handleSubmit, readOnly, itens, itensEstoque, pessoas, contas } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name="pessoa" component={LabelAndFormSelect} displayProperty='nome' readOnly={readOnly}
                        label='Pessoa' cols='12 4' placeholder='Informe a Pessoa' options={pessoas} />
                </div>
                <div className='box-body'>
                    <Field name="conta" component={LabelAndFormSelect} displayProperty='descricao' readOnly={readOnly}
                        label='Conta' cols='12 4' placeholder='Informe a Conta' options={contas} />
                </div>
                <div className='box-body'>
                    <Field name='valor' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Valor' cols='12 4' placeholder='Informe o valor' />
                </div>
                <div className='box-body'>
                    <ItemList cols='12' list={itens} itensEstoque={itensEstoque} readOnly={readOnly}
                            field='itens' legend='Itens' />                
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

VendaForm = reduxForm({form: 'vendaForm', destroyOnUnmount: false})(VendaForm)
const selector = formValueSelector('vendaForm')
const mapStateToProps = state => ({
    pessoas: state.venda.pessoas, 
    contas: state.venda.contas,
    itensEstoque: state.venda.itensEstoque,
    itens: selector(state, 'itens')
})
const mapDispatchToProps = dispatch => bindActionCreators({init, getPessoas, getContas, getItens}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(VendaForm)