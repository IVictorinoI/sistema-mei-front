import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './pessoaActions'
import LabelAndInput from '../common/form/labelAndInput'

class PessoaForm extends Component {

    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='cpfCnpj' component={LabelAndInput} readOnly={readOnly}
                        label='CPF/CNPJ' cols='12 4' placeholder='Informe o CPF ou CNPJ' />
                </div>
                <div className='box-body'>
                    <Field name='nome' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o Nome' />
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

PessoaForm = reduxForm({form: 'pessoaForm', destroyOnUnmount: false})(PessoaForm)
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(PessoaForm)