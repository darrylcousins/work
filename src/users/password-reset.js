/**
 * @file Provides a `reset-password` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Form } from 'react-form'
import gql from 'graphql-tag'

import Client from '../client'
import Settings from '../settings'
import { getUserByEmail, getUserByUsername } from './queries'
import Input from '../forms/input.js'
import Message from '../forms/message.js'
import { getLocalUser } from '../auth/queries.js'

export default class UpdateProfile extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.async_validate_email = this.async_validate_email.bind(this)
  }

  validate_email(value) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(value)) return null
    return "Email does not validate"
  }

  async async_validate_email(value) {
    if (!value || value.trim() === '') {
      return {'warning': 'Please enter a valid email address.'}
    }
    var response = await Client.query({
        query: getUserByEmail,
        variables: {email: value},
    })
    if (response.data.allUsers.edges.length === 0) {
      return {'error': 'No user found with that email address.'}
    }
  }

  validate(data) {
    // test for empty fields do it here rather than at field level
    let required = {
      email: "Email",
    }
    let ret = Object()
    for (var key in required) {
      if (required.hasOwnProperty(key) && data.hasOwnProperty(key)) {
        if (!data[key] || data[key].trim() === '') {
          ret[key] = Object()
          ret[key]["error"] = `${ required[key] } is a required field`
          ret[key]["warning"] = `Please enter a ${ required[key].toLowerCase() }`
        }
      }
    }
    return ret
  }

  onSubmit(data, e, formApi) {
    const M = gql`
      mutation {
          passwordReset(
            data: {
              email: "${ data["email"] }",
              }
            )
          {
          status
          formErrors
          email
        }
      }
    `
    // get a promise
    Client.mutate({
      mutation: M,
      })
      .then((outcome) => {
        var result = outcome.data.passwordReset
        if (result.formErrors !== null) {
          formApi.setFormState("submitting", false)
          const errors = JSON.parse(result.formErrors)
          // reset form with submitted data
          for (var key in data) {
            formApi.setValue(key, data[key])
          }
          // set errors
          for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
              formApi.setError(key, errors[key][0])
            }
          }
        } else {
          // success
          // TODO feedback and redirect somewhere
          console.log('SUCCESS', result.email)
        }
      })
      .catch((errors) => {
        console.log(errors)
        // form reset and unusable
        formApi.setError("__all__", "Network error, you may need to reload page")
      })
  }

  render() {
    return (
      <Form onSubmit={ this.onSubmit }
        validate={ this.validate }
        >
        {formApi => (
          <form
            onSubmit={ formApi.submitForm }
            id="user_update_form"
            className={ Settings.style.form }>
            <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
            <Input
              formApi={ formApi }
              name="email"
              title="Email"
              help_text="Your email address."
              validate={ this.validate_email}
              asyncValidate={ this.async_validate_email}
            />
            <button
              type="submit"
              className={ Settings.style.buttonDefault }
            >Update
            </button>
          </form>
        )}
      </Form>
    )
  }
}
