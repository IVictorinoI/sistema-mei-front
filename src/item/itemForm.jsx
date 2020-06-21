import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './itemActions'
import LabelAndInput from '../common/form/labelAndInput'

class ItemForm extends Component {

    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='identificacao' component={LabelAndInput} readOnly={readOnly}
                        label='Identificação' cols='12 4' placeholder='Informe a identificação' />
                </div>
                <div className='box-body'>
                    <Field name='descricao' component={LabelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 4' placeholder='Informe a descrição' />
                </div>
                <div className='box-body'>
                    <Field name='precoVenda' component={LabelAndInput} type='number' readOnly={readOnly}
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

ItemForm = reduxForm({form: 'itemForm', destroyOnUnmount: false})(ItemForm)
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(ItemForm)