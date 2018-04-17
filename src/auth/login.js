/**
 * @file Provides a `login` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Form } from 'react-form'
import gql from 'graphql-tag'

import Client from '../client'
import Settings from '../settings'
import Input from '../forms/input.js'
import PasswordInput from '../forms/password.js'
import Message from '../forms/message.js'
import {
  getLocalUser,
  setLocalUser
} from './queries.js'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  username_validate(username) {
    return !username || username.trim() === '' ? 'Username is a required field' : null
  }

  username_async_validate(username) {
    return null
  }

  password_validate(password) {
    return !password || password.trim() === '' ? 'Password is a required field' : null
  }

  onSubmit(data, e, formApi) {
    // failed to work out how to use template substitution at this level.
    const M = gql`
      mutation {
        createTokenAuth(data: {username: "${ data["username"] }", password: "${ data["password"] }"} ) {
          status
          formErrors
          username
          uid
          tokenAuth {
            token
          }
        }
      }
    `
    // get a promise
    Client.mutate({
      mutation: M,
      })
      .then((data) => {
        var result = data.data.createTokenAuth
        if (result.formErrors != null) {
          formApi.setFormState("submitting", false)
          const errors = JSON.parse(result.formErrors)
          var field
          for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
              // XXX __all__ renders form useless, dunno why
              field = key
              if (field === "__all__") field = "username"
              formApi.setError(field, errors[key][0])
            }
          }
        } else {
          localStorage.setItem("token", result.tokenAuth.token)
          Client.mutate(
            { mutation: setLocalUser,
              variables: {
                username: result.username,
                id: result.uid
              }
            }
          )
        }
      })
      .catch((errors) => {
        console.log(errors)
        // XXX __all__ renders form useless, dunno why
        formApi.setError("__all__", "Network error, you may need to reload page")
      })
  }

  render() {
    return (
      <Query query={ getLocalUser }>
        {({ client, loading, data: { user } }) => {
          let style = Settings.style
          if (loading) {
            return <span className={ style.navLink }>Loading...</span>
          }
          if (user && user.username !== 'anonymous') {
            return (
              <Redirect
                to="/"
                from="/login"
              />
            )
          } else {
            return (
                <Form onSubmit={ this.onSubmit }>
                  {formApi => (
                    <form
                      onSubmit={ formApi.submitForm }
                      id="login_form"
                      className={ style.form }>
                      <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
                      <Input
                        formApi={ formApi }
                        name="username"
                        title="Username"
                        help_text="Please enter your username."
                        validate={ this.username_validate }
                        asyncValidate={this.username_async_validate}
                      />
                      <PasswordInput
                        formApi={ formApi }
                        name="password"
                        title="Password"
                        help_text="Please enter your password."
                        validate={ this.password_validate }
                      />
                      <button
                        type="submit"
                        className={ style.buttonDefault }
                      >Submit
                      </button>
                    </form>
                  )}
                </Form>
            )
          }
        }}
      </Query>
    )
  }
}

export default Login
