/**
 * @file Provides a `home` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../layout/page'
import Article from '../layout/article'
import ProfileLead from '../users/profile-lead'

export default () =>
  <Page title="Keep a diary of tasks"
        lead="How do you spend your day?">
    <Article>
      <ProfileLead/>
      <br/>
      Here it all begins.</Article>
  </Page>
