/**
 * @file Provides a `NavProfile` component for the navbar
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { CSSTransition } from 'react-transition-group'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt'
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'

import Settings from '../settings'
import Client from '../client'
import { getLocalUser } from './queries'

class ProfileForNav extends React.Component {

  constructor(props) {
    super(props)
    this.state = { in: false }
  }

  componentDidMount() {
    this.setState({ in: true })
  }

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
              <CSSTransition
                in={ this.state.in }
                timeout={300}
                classNames="fade"
                unmountOnExit
                >
                <Link to="/login" title="Login"
                  className={ style.navLink }>
                  <FontAwesomeIcon icon={ faSignInAlt } color="navy" />
                  &nbsp;Login
                </Link>
              </CSSTransition>
            )
          } else if (user && user.username !== 'anonymous') {
            return (
              <CSSTransition
                in={ this.state.in }
                timeout={600}
                classNames="fade"
                unmountOnExit
                >
                <span>
                  <Link to={ `/users/${ user.username }`} title="Profile"
                    className={ style.navLink }>
                    <FontAwesomeIcon icon={ faUser } color="navy" />
                    &nbsp;{ user.username }
                  </Link>
                  <a className={ style.navLink }
                    onClick={() => {
                      this.logout()
                    }}
                  >
                    <FontAwesomeIcon icon={ faSignOutAlt } color="navy" />
                    &nbsp;Log out
                  </a>
                </span>
              </CSSTransition>
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
