/**
 * @file Provides a `login` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../layout/page'
import Article from '../layout/article'
import Settings from '../settings'
import Profile from '../users/profile'
import ProfileLead from '../users/profile-lead'
import UserLinks from '../users/user-links'

export default class ProfilePage extends React.Component {

  render() {
    let username = this.props.match.params.username
    return (
      <Page title="User profile"
            lead="">
        <Article>
          <ProfileLead/>
          <div className={ Settings.style.colLeft }>
            <Profile username={ username } />
          </div>
          <div className={ Settings.style.colRight }>
            <h3>All users</h3>
            <UserLinks/>
          </div>
        </Article>
      </Page>
    )
  }
}

