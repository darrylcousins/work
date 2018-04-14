/**
 * @file Provides a `Profile` component for users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Settings from '../settings'
import Page from '../layout/page'
import Article from '../latout/article'

const Q = gql`
  {
    currentUser {
      id
      username
      firstName
      lastName
      email
      staff {
        title
        comment
      }
    }
  }
`

class Protected extends React.Component {

  render(refetch) {
    let style = Settings.style
    if ( this.props.match.params.username !== undefined) {
      return (
        <div>{ this.props.match.params.username }</div>
      )
    }
    return (
      <Page title="Your profile"
            lead="Cool that you're here.">
        <Article>
          <Query query={ Q }
            fetchPolicy={ refetch ? 'cache-and-network': 'cache-first' }
          >
            {({ loading, error, data: { currentUser } }) => {
              if (loading) return <span>loading....</span>
              if (error) return <div><strong>Error:</strong> { error.message }</div>
              if (currentUser == null) {
                return (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: this.props.location }
                    }}
                  />
                )
              }
              let user = currentUser
              return (
                <div>
                  <h2>Welcome back {user.firstName}</h2>
                  <p>
                    This is what we have on you:
                  </p>
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

