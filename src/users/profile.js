/**
 * @file Provides a `Profile` component for users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import Settings from '../settings'
import Page from '../layout/page'
import Article from '../layout/article'
import { getUserByUsername } from './queries'
import { getLocalUser } from '../auth/queries'
import { getUserLinks } from './queries'

const UserSummary = ({ user }) => {

  return (
    <Link className={ Settings.style.listLink }
      to={ `/users/${ user.username }` }>
      { user.username }
      { user.staff !== null && <span>&nbsp;&lt;{ user.staff.title }&gt;</span> }
    </Link>
  )
}

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
          <div className={ Settings.style.colLeft }>
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
          </div>
          <div className={ Settings.style.colRight }>
            <h3>Users</h3>
              <Query query={ getUserLinks }>
                {({ loading, error, data }) => {
                  if (loading) return <div>loading...</div>
                  if (error) return <div>Error! { error.message }</div>

                  return (
                    <div>
                      { data.allUsers.edges.map(user => (
                        <UserSummary key={ user.node.id }
                                     user={ user.node } />
                      ))}
                    </div>
                  )
                }}
              </Query>
          </div>
        </Article>
      </Page>
    )
  }
}

export default Profile
