/**
 * @file Provides a `signup` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../layout/page'
import Article from '../layout/article'
import CreateUser from '../users/signup'

export default () =>
  <Page title="Sign up"
        lead="Get started here.">
    <Article>
      <CreateUser/>
    </Article>
  </Page>

