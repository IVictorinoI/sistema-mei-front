import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './categoriaFinanceiraActions'
import LabelAndInput from '../common/form/labelAndInput'

class CategoriaFinanceiraForm extends Component {

    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='descricao' component={LabelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 4' placeholder='Informe a descrição' />
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

CategoriaFinanceiraForm = reduxForm({form: 'categoriaFinanceiraForm', destroyOnUnmount: false})(CategoriaFinanceiraForm)
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(CategoriaFinanceiraForm)