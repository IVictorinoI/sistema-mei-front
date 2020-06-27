import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import axios from 'axios'

import { init, getPagars } from './baixaPagarActions'
import LabelAndInput from '../common/form/labelAndInput'
import LabelAndFormSelect from '../common/form/labelAndFormSelect'
import ItemList from './itemList'

class VendaForm extends Component {
    componentDidMount() {
        this.props.getPagars();
    }

    render() {
        const { handleSubmit, readOnly, titulos, pagars } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='valor' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Valor' cols='12 4' placeholder='Informe o valor' />
                </div>
                <div className='box-body'>
                    <ItemList cols='12' list={titulos} pagars={pagars} readOnly={readOnly}
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

VendaForm = reduxForm({form: 'baixaPagarForm', destroyOnUnmount: false})(VendaForm)
const selector = formValueSelector('baixaPagarForm')
const mapStateToProps = state => ({
    pagars: state.baixaPagar.pagars, 
    titulos: selector(state, 'titulos')
})
const mapDispatchToProps = dispatch => bindActionCreators({init, getPagars}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(VendaForm)