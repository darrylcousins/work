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
import { getUserByUsername } from '../users/queries'
import {
  getLocalUser,
  setLocalUser
} from '../auth/queries.js'

class CreateUser extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  username_validate(username) {
    return !username || username.trim() === '' ? 'Username is a required field' : null
  }

  async username_async_validate(username) {
    var response = await Client.query({
        query: getUserByUsername,
        variables: {username: username},
    })
    if (response.data.allUsers.edges.length !== 0) {
      return {error: 'That username is already in use', success: null}
    }
  }


  password_validate(password) {
    return !password || password.trim() === '' ? 'Password is a required field' : null
  }

  password_match_validate(values) {
    return values.password1 !== values.password2 ?
      { password2: { error: 'Passwords do not match' }} : null
  }

  onSubmit(data, e, formApi) {
    // failed to work out how to use template substitution at this level.
    const M = gql`
      mutation {
          createUser(
            data: {
              username: "${ data["username"] }",
              password1: "${ data["password1"] }",
              password2: "${ data["password2"] }",
              }
            )
          {
          status
          formErrors
          username
          uid
        }
      }
    `
    // get a promise
    Client.mutate({
      mutation: M,
      })
      .then((data) => {
        var result = data.data.createUser
        if (result.formErrors != null) {
          formApi.setFormState("submitting", false)
          const errors = JSON.parse(result.formErrors)
          var field
          for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
              formApi.setError(field, errors[key][0])
            }
          }
        } else {
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
          if (loading) {
            return <span className={ Settings.style.navLink }>Loading...</span>
          }
          if (user && user.username !== 'anonymous') {
            return (
              <Redirect
                to="/users"
                from="/signup"
              />
            )
          } else {
            return (
              <Form onSubmit={ this.onSubmit }
                    validate={ this.password_match_validate }>
                {formApi => (
                  <form
                    onSubmit={ formApi.submitForm }
                    id="signup_form"
                    className={ Settings.style.form }>
                    <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
                    <Input
                      formApi={ formApi }
                      name="username"
                      title="Username"
                      help_text="Please choose a username."
                      validate={ this.username_validate }
                      asyncValidate={this.username_async_validate}
                    />
                    <PasswordInput
                      formApi={ formApi }
                      name="password1"
                      title="Password1"
                      help_text="Please choose a password."
                      validate={ this.password_validate }
                    />
                    <PasswordInput
                      formApi={ formApi }
                      name="password2"
                      title="Password2"
                      help_text="And your password again for confirmation"
                      validate={ this.password_validate }
                    />
                    <button
                      type="submit"
                      className={ Settings.style.buttonDefault }
                    >Sign up
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

export default CreateUser

