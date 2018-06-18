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
import Input from '../forms/input.js'
import PasswordInput from '../forms/password.js'
import Message from '../forms/message.js'
import { getUserByUsername } from '../users/queries'
import {
  getLocalUser,
  setLocalUser
} from '../auth/queries.js'

export default class PasswordReset extends React.Component {

  render() {
    return (
      <div>Rest passwod</div>
    )
  }
}

