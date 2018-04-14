/**
 * @file Provides a `user` if authenticated else null
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import gql from 'graphql-tag'

import Client from '../client'

const Q = gql`
  {
    currentUser {
      id
      username
    }
  }
`

/*
 * Query the backend for an authenticated user.
 * Because the application now stores user details with apollo client this is
 * unused, but perhaps later could be used to re-identify the user against the
 * backend to reauthenticate the token
 */
export default () => {
  return Client.query({
    query: Q,
    fetchPolicy: "network-only"
  })
  .then((data) => {
    let user = data.data.currentUser
    return user
  })
  .catch((errors) => {
    return errors
  })
}
