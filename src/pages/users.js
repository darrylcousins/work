/**
 * @file Provides a `user` page with list of users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../layout/page'
import Article from '../layout/article'
import UserList from '../users/user-list'

export default () =>
  <Page title="Users"
        lead="List of users of the site">
    <Article>
      <UserList/>
    </Article>
  </Page>
