/**
 * @file Provides a `Profile` component for users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Query } from 'react-apollo'

import Settings from '../settings'
import Page from '../layout/page'
import Article from '../layout/article'
import { getUserByUsername } from './queries'
import { getLocalUser } from '../auth/queries'

class Profile extends React.Component {

  render() {
    let style = Settings.style
    let username = this.props.match.params.username
    return (
      <Page title="User profile"
            lead="">
        <Article>
          <Query query={ getLocalUser }>
            {({ client, loading, data: { user } }) => {
              let style = Settings.style
              if (loading) {
                return <span className={ style.navLink }>Loading...</span>
              }
              if (user && user.username !== 'anonymous') {
                return (
                  <div>Welcome { user.username }</div>
                )
              }
              return null
            }}
          </Query>
          <Query query={ getUserByUsername } variables={{ username }}>
            {({ loading, error, data }) => {
              if (loading) return <div>loading...</div>
              if (error) return <div>Error! { error.message }</div>
              if (data.allUsers.edges.length === 0) return <div>Error! No user found!</div>

              let user = data.allUsers.edges[0].node
              return (
                <div>
                  <h2>User profile for: { user.username }</h2>
                  <dl className={ style.dl }>
                    <dt className={ style.dt }>email:</dt>
                    <dd className={ style.dd }>{ user.email }</dd>
                  </dl>
                  <dl className={ style.dl }>
                    <dt className={ style.dt }>full name:</dt>
                    <dd className={ style.dd }>{ user.firstName } { user.lastName }</dd>
                  </dl>
                  <dl className={ style.dl }>
                    <dt className={ style.dt }>username:</dt>
                    <dd className={ style.dd }>{ user.username }</dd>
                  </dl>
                  <dl className={ style.dl }>
                    <dt className={ style.dt }>role:</dt>
                    <dd className={ style.dd }>{ user.staff ? user.staff.title : null }</dd>
                  </dl>
                </div>
              )
            }}
          </Query>
        </Article>
      </Page>
    )
  }
}

export default Profile
