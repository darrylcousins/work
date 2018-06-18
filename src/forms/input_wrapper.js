/**
 * @file Provides an `InputWrapper` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Settings from '../settings'
import Message from './message'

export default class InputWrapper extends React.Component {

  render() {

    const { formApi, name, title, help_text, children } = this.props

    return (
      <div className={ Settings.style.inputWrapper }>
        <label
          htmlFor={ name }
          className={ Settings.style.label }
        >{ title }</label>
        { children }
        <div>{ formApi.errors && <Message name={ name } type="error" messages={ formApi.errors }/> }</div>
        <div>{ formApi.asyncErrors && <Message name={ name } type="error" messages={ formApi.asyncErrors }/> }</div>
        <div>{ formApi.warnings && <Message name={ name } type="warning" messages={ formApi.warnings }/> }</div>
        <div>{ formApi.successes && <Message name={ name } type="success" messages={ formApi.successes }/> }</div>
        <small
          id={ name + "-help-text" }
          className={ Settings.style.inputHelpText }
        >{ help_text }
        </small>
      </div>
    )
  }
}
