/**
 * @file Provides a `update-user` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../layout/page'
import Article from '../layout/article'
import UpdateProfile from '../users/update-profile'

export default class UpdateProfilePage extends React.Component {

  render() {
    let username = this.props.match.params.username
    return (
      <Page title="Update profile"
            lead="Edit your details.">
        <Article>
          <UpdateProfile username={ username } />
        </Article>
      </Page>
    )
  }
}
