import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import axios from 'axios'

import { init, getPessoas, getContas, getCategoriaFinanceiras } from './extratoActions'
import LabelAndInput from '../common/form/labelAndInput'
import LabelAndFormSelect from '../common/form/labelAndFormSelect'

class ExtratoForm extends Component {
    componentDidMount() {
        this.props.getPessoas();
        this.props.getContas();
        this.props.getCategoriaFinanceiras();
    }

    render() {
        const { handleSubmit, readOnly, pessoas, contas, categoriaFinanceiras } = this.props
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
                    <Field name="categoriaFinanceira" component={LabelAndFormSelect} displayProperty='descricao' readOnly={readOnly}
                        label='Categoria' cols='12 4' placeholder='Informe a Categoria' options={categoriaFinanceiras} />
                </div>
                <div className='box-body'>
                    <Field name='descricao' component={LabelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 4' placeholder='Informe a descrição' />
                </div>
                <div className='box-body'>
                    <Field name='data' component={LabelAndInput} readOnly={readOnly}
                        label='Data' cols='12 4' type='date' />
                </div>
                <div className='box-body'>
                    <Field name='valor' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Valor' cols='12 4' placeholder='Informe o valor' />
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

ExtratoForm = reduxForm({form: 'extratoForm', destroyOnUnmount: false})(ExtratoForm)
const mapStateToProps = state => ({pessoas: state.extrato.pessoas, contas: state.extrato.contas, categoriaFinanceiras: state.extrato.categoriaFinanceiras})
const mapDispatchToProps = dispatch => bindActionCreators({init, getPessoas, getContas, getCategoriaFinanceiras}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ExtratoForm)