/**
 * @file Provides a `Profile` component for users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Settings from '../settings'
import Page from '../layout/page.js'
import Article from '../layout/article.js'

const Q = gql`
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

class Profile extends React.Component {

  render() {
    let style = Settings.style
    let username = this.props.match.params.username
    return (
      <Page title="User profile"
            lead="">
        <Article>
          <Query query={ Q } variables={{ username }}>
            {({ loading, error, data }) => {
              if (loading) return <div>loading...</div>
              if (error) return <div>Error! { error.message }</div>
              if (data.allUsers.edges.length === 0) return <div>Error! No user found!</div>

              let user = data.allUsers.edges[0].node
              return (
                <div>
                  <h2>User profile for: {user.firstName}</h2>
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
                    <dd className={ style.dd }>{ user.staff.title }</dd>
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
