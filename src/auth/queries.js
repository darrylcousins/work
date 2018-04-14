/**
 * @file Provides authentication queries for local graphql store
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import gql from 'graphql-tag'

export const getLocalUser = gql`
  query {
    user @client {
      username
      id
    }
  }
`

export const setLocalUser = gql`
  mutation updateUser(
      $username: String,
      $id: String
    ){
      user(username: $username, id: $id) @client
    }
`
