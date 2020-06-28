import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import axios from 'axios'

import { init, getPessoas } from './receberActions'
import LabelAndInput from '../common/form/labelAndInput'
import LabelAndFormSelect from '../common/form/labelAndFormSelect'

class ReceberForm extends Component {
    componentDidMount() {
        this.props.getPessoas();
    }

    render() {
        const { handleSubmit, readOnly, pessoas } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name="pessoa" component={LabelAndFormSelect} displayProperty='nome' readOnly={readOnly}
                        label='Pessoa' cols='12 4' placeholder='Informe a Pessoa' options={pessoas} />
                </div>
                <div className='box-body'>
                    <Field name='descricao' component={LabelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 4' placeholder='Informe a descrição' />
                </div>
                <div className='box-body'>
                    <Field name='dataEmissao' component={LabelAndInput} readOnly={readOnly}
                        label='Emissão' cols='12 4' type='date' />
                    <Field name='dataVencimento' component={LabelAndInput} readOnly={readOnly}
                        label='Vencimento' cols='12 4' type='date' />
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

ReceberForm = reduxForm({form: 'receberForm', destroyOnUnmount: false})(ReceberForm)
const mapStateToProps = state => ({pessoas: state.receber.pessoas})
const mapDispatchToProps = dispatch => bindActionCreators({init, getPessoas}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ReceberForm)