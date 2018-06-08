/**
 * @file Provides a `Profile` component for users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle'

import Settings from '../settings'
import { getUserLinks } from './queries'

const UserSummary = ({ user }) => {

  return (
    <li className="fa-li w-100 tl">
      <FontAwesomeIcon icon={ faUserCircle } color="navy" listItem />
      <Link className={ Settings.style.listLink }
        to={ `/users/${ user.username }` }>
        { user.username }
        { user.staff !== null && <span>&nbsp;&lt;{ user.staff.title }&gt;</span> }
      </Link>
    </li>
  )
}

export default class UserLinks extends React.Component {

  render() {

    return (
      <Query query={ getUserLinks }>
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>
          if (error) return <div>Error! { error.message }</div>

          return (
            <ul className="fa-ul pl3-ns">
              { data.allUsers.edges.map(user => (
                <UserSummary key={ user.node.id }
                             user={ user.node } />
              ))}
            </ul>
          )
        }}
      </Query>
    )
  }
}
