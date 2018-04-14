/**
 * @file Provides `resolvers` for local graphql queries
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
const UserType = "User"
const UsernameDefault = "anonymous"

export const defaults = {
  user: {
    username: UsernameDefault,
    id: null,
    __typename: UserType,
  }
}

export const resolvers = {
  Mutation: {
    user: (_, { username, id }, { cache }) => {
      cache.writeData({
        data: {
          user: {
            username: username,
            id: id,
            __typename: UserType,
          }
        }
      })
      return null
    },
  }
}
