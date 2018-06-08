/**
 * @file Provides an `update profile` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Form, Text } from 'react-form'
import gql from 'graphql-tag'

import Client from '../client'
import Settings from '../settings'
import Input from '../forms/input.js'
import Message from '../forms/message.js'
import { getLocalUser } from '../auth/queries.js'

export default class UpdateProfile extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  validate_proper_noun(noun) {
    if (noun.match(/^[-\w.@]{1,30}$/) === null) {
      return 'Username does not validate'
    }
    return null
  }

  onSubmit(data, e, formApi) {
    const M = gql`
      mutation {
          updateStaff(
            data: {
              username: "${ data["username"] }",
              title: "${ data["title"] }",
              first_name: "${ data["first_name"] }",
              last_name: "${ data["last_name"] }",
              email: "${ data["email"] }",
              comment: "${ data["comment"] }",
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
    // include required username
    data["username"] = this.props.username

    // get a promise
    Client.mutate({
      mutation: M,
      })
      .then((data) => {
        var result = data.data.updateStaff
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
          // success
          console.log(result.username)
        }
      })
      .catch((errors) => {
        console.log(errors)
        // XXX __all__ renders form useless, dunno why
        formApi.setError("__all__", "Network error, you may need to reload page")
      })
  }

  render() {
    let username = this.props.username
    return (
      <Query query={ getLocalUser }>
        {({ client, loading, data: { user } }) => {
          if (loading) {
            return <span className={ Settings.style.navLink }>Loading...</span>
          }
          if (user.username === 'anonymous' ) {
            return (
              <Redirect
                to="/login"
                from="/users/{ username }/update-profile"
              />
            )
          } else if (user.username !== username) {
            return (
              <div>
                <strong>You do not have permissions to update this user</strong>
                <span>{ username }</span>
                <span>{ user.username }</span>
              </div>
            )
          } else {
            return (
              <Form onSubmit={ this.onSubmit }>
                {formApi => (
                  <form
                    onSubmit={ formApi.submitForm }
                    id="user_update_form"
                    className={ Settings.style.form }>
                    <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
                    <Input
                      formApi={ formApi }
                      name="first_name"
                      title="First name"
                      help_text="One word your first name only."
                    />
                    <Input
                      formApi={ formApi }
                      name="last_name"
                      title="Last name"
                      help_text="One word your last name only."
                    />
                    <Input
                      formApi={ formApi }
                      name="title"
                      title="Title"
                      help_text="Your job title."
                    />
                    <Input
                      formApi={ formApi }
                      name="email"
                      title="Email"
                      help_text="Your email address."
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
        }}
      </Query>
    )
  }
}
