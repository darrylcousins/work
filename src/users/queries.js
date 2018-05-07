/**
 * @file Provides user queries for remote graphql store
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import gql from 'graphql-tag'

export const getUsers = gql`
  {
    allUsers {
      edges {
        node {
          id,
          username,
          email,
          firstName,
          lastName,
          staff {
            title
          }
        }
      }
    }
  }
`

export const getUserLinks = gql`
  {
    allUsers {
      edges {
        node {
          id,
          username,
          staff {
            title
          }
        }
      }
    }
  }
`
export const getUserByUsername = gql`
  query user($username: String!) {
    allUsers(username: $username) {
      edges {
        node {
          id,
          username,
          email,
          firstName,
          lastName,
          staff {
            title
          }
        }
      }
    }
  }
`

export const getUserByEmail = gql`
  query user($email: String!) {
    allUsers(email: $email) {
      edges {
        node {
          id,
          username,
          email,
          firstName,
          lastName,
          staff {
            title
          }
        }
      }
    }
  }
`
