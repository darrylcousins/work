/**
 * @file Provides a `client` for graphql queries
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

// will need to merge these later
// https://www.apollographql.com/docs/link/links/state.html#organize
import { defaults, resolvers } from '../auth/resolvers'

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:4000/graphql'
})

const authLink = setContext((request, { headers }) => {
  const token = localStorage.getItem('token');
  console.log("TOKEN:", token)
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
})

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)

const typeDefs = `
  type User {
    username: String!
    id: String!
  }
  type Mutation {
    updateUser(
      username: String!,
      id: String!
      ): User
  }
  type Query {
    user: {
      id
      username
    }
  }
`

const stateLink = withClientState({ resolvers, cache, defaults, typeDefs })

export default new ApolloClient({
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
  cache: cache,
})
