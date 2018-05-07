/**
 * @file Provides a `ProfileLead` component for user profile page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Query } from 'react-apollo'

import Settings from '../settings'
import { getLocalUser } from '../auth/queries'

export default class ProfileLead extends React.Component {

  render() {
    return (
      <Query query={ getLocalUser }>
        {({ client, loading, data: { user } }) => {
          if (loading) {
            return <span className={ Settings.style.navLink }>Loading...</span>
          }
          if (user && user.username !== 'anonymous') {
            return (
              <div>Welcome { user.username }</div>
            )
          }
          return null
        }}
      </Query>
    )
  }
}
