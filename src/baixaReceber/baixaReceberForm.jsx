import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import axios from 'axios'

import { init, getRecebers, getContas, getCategoriaFinanceiras } from './baixaReceberActions'
import LabelAndInput from '../common/form/labelAndInput'
import LabelAndFormSelect from '../common/form/labelAndFormSelect'
import ItemList from './itemList'

class VendaForm extends Component {
    componentDidMount() {
        this.props.getRecebers();
        this.props.getContas();
        this.props.getCategoriaFinanceiras();
    }

    render() {
        const { handleSubmit, readOnly, titulos, recebers, contas, categoriaFinanceiras } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name="conta" component={LabelAndFormSelect} displayProperty='descricao' readOnly={readOnly}
                        label='Conta' cols='12 4' placeholder='Informe a Conta' options={contas} />
                </div>
                <div className='box-body'>
                    <Field name="categoriaFinanceira" component={LabelAndFormSelect} displayProperty='descricao' readOnly={readOnly}
                        label='Categoria' cols='12 4' placeholder='Informe a Categoria' options={categoriaFinanceiras} />
                </div>                
                <div className='box-body'>
                    <ItemList cols='12' list={titulos} recebers={recebers} readOnly={readOnly}
                            field='titulos' legend='Títulos' />                
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

VendaForm = reduxForm({form: 'baixaReceberForm', destroyOnUnmount: false})(VendaForm)
const selector = formValueSelector('baixaReceberForm')
const mapStateToProps = state => ({
    recebers: state.baixaReceber.recebers,
    contas: state.extrato.contas, 
    categoriaFinanceiras: state.extrato.categoriaFinanceiras, 
    titulos: selector(state, 'titulos')
})
const mapDispatchToProps = dispatch => bindActionCreators({init, getRecebers, getContas, getCategoriaFinanceiras}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(VendaForm)