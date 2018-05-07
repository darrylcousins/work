/**
 * @file Provides a `UserList` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import Settings from '../settings'

import { getUsers } from './queries'

/**
 * `UserSummary` provides the layout for a user
 * @param {node} user - the user
 */
const UserSummary = ({ user }) => {

  let style = Settings.style

  return (
    <div className="fl w-100 w-50-ns pa2">
      <Link className={ style.blockLink }
        to={ `/users/${ user.username }` }>
        <div className={ style.dlWrapper }>
          <dl className={ style.dl }>
            <dt className={ style.dt }>full name:</dt>
            <dd className={ style.dd }>{ user.firstName } { user.lastName }</dd>
          </dl>
          <dl className={ style.dl }>
            <dt className={ style.dt }>email:</dt>
            <dd className={ style.dd }>{ user.email }</dd>
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
      </Link>
    </div>
  )
}

/**
 * `Users` provides the layout for a fetched list of users
 */
export default class UserList extends React.Component {

  render() {
    return (
      <Query query={ getUsers }>
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>
          if (error) return <div>Error! { error.message }</div>

          return (
            <div className="cf">
              { data.allUsers.edges.map(user => (
                <UserSummary key={ user.node.id }
                             user={ user.node } />
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}
