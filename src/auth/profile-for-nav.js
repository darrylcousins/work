/**
 * @file Provides a `NavProfile` component for the navbar
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import Settings from '../settings'
import Client from '../client'
import { getLocalUser } from './queries'

class ProfileForNav extends React.Component {

  logout() {
    localStorage.removeItem("token")
    Client.resetStore()
  }

  render() {
    return (
      <Query query={ getLocalUser }>
        {({ client, loading, data: { user } }) => {
          let style = Settings.style
          if (loading) {
            return <span className={ style.navLink }>Loading...</span>
          }
          if (user && user.username === 'anonymous') {
            return (
              <Link to="/login" title="Login"
                className={ style.navLink }>
                Login
              </Link>
            )
          } else if (user && user.username !== 'anonymous') {
            return (
              <span>
                <Link to={ `/users/${ user.username }`} title="Profile"
                  className={ style.navLink }>
                  { user.username }
                </Link>
                <a className={ style.navLink }
                  onClick={() => {
                    this.logout()
                  }}
                >
                  Log out
                </a>
              </span>
            )
          } else {
            return <span className={ style.navLink }>Failed to load</span>
          }
        }}
      </Query>
    )
  }
}

export default ProfileForNav
