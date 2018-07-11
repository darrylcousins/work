/**
 * @file Provides an `update profile` form component
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
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(value)) return null
    return "Email does not validate"
  }

  async async_validate_email(value) {
    console.log(this.props.username)
    var response = await Client.query({
        query: getUserByEmail,
        variables: {email: value},
    })
    if (response.data.allUsers.edges.length !== 0) {
      let user = response.data.allUsers.edges[0].node
      if (user.username !== this.props.username) {
        return {error: 'That email is already taken by another user.', success: null}
      }
    }
  }

  validate_proper_noun(value) {

    var spaces = /\s+/
    var propernoun = /^[A-Z]{1}[a-z]*$/
    if (value.match(propernoun) !== null) {
      return null
    }
    var corrected = ''

    var words = value.split(spaces)
    if (words.length > 1) {
      words.forEach(function(el, idx) {
        if (idx === 0){
          corrected += el.charAt(0).toUpperCase() + el.substr(1).toLowerCase()
        } else {
          corrected += el.substr(0).toLowerCase()
        }
      })
    } else {
      if (value.match(propernoun) === null) {
        corrected = value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
        console.log('NO Match')
      }
    }
    if (corrected !== ''){
      return {
        error: `Just one proper noun please. Did you mean ${corrected}?`
      }
    }
  }

  validate(data) {
    // test for empty fields do it here rather than at field level
    let required = {
      email: "Email",
      first_name: "First name",
      last_name: "Last name",
      title: "Title",
    }
    console.log(data)
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
    // include required username
    data["username"] = this.props.username

    const M = gql`
      mutation {
          updateStaff(
            data: {
              username: "${ data["username"] }",
              title: "${ data["title"] }",
              firstName: "${ data["first_name"] }",
              lastName: "${ data["last_name"] }",
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
    // get a promise
    Client.mutate({
      mutation: M,
      })
      .then((outcome) => {
        var result = outcome.data.updateStaff
        if (result.formErrors != null) {
          formApi.setFormState("submitting", false)
          const errors = JSON.parse(result.formErrors)
          // reset form with submitted data
          var key
          for (key in data) {
            formApi.setValue(key, data[key])
          }
          // set errors
          for (key in errors) {
            if (errors.hasOwnProperty(key)) {
              formApi.setError(key, errors[key][0])
            }
          }
        } else {
          // success
          // TODO feedback and redirect somewhere
          console.log('SUCCESS', result.username)
        }
      })
      .catch((errors) => {
        // console.log(errors)
        // form reset and unusable
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
              <Query query={ getUserByUsername } variables={{ username }}>
                {({ loading, error, data }) => {

                  if (loading) return <div>loading...</div>
                  if (error) return <div>Error! { error.message }</div>
                  if (data.allUsers.edges.length === 0) return <div>Error! No user found!</div>

                  let user = data.allUsers.edges[0].node
                  console.log(user)
                  return (
                    <Form onSubmit={ this.onSubmit }
                      validate={ this.validate }
                      defaultValues={
                        {
                          email: user.email,
                          first_name: user.firstName,
                          last_name: user.lastName,
                          title: user.staff ? user.staff.title : ''
                        }
                      }
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
                          <Input
                            formApi={ formApi }
                            name="first_name"
                            title="First name"
                            help_text="One word your first name only."
                            validate={ this.validate_proper_noun}
                          />
                          <Input
                            formApi={ formApi }
                            name="last_name"
                            title="Last name"
                            help_text="One word your last name only."
                            validate={ this.validate_proper_noun}
                          />
                          <Input
                            formApi={ formApi }
                            name="title"
                            title="Title"
                            help_text="Your job title."
                            validate={ this.validate_proper_noun}
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
              </Query>
            )
          }
        }}
      </Query>
    )
  }
}
