/**
 * @file Provides a `home` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../layout/page'
import Article from '../layout/article'

export default () =>
  <Page title="Keep diary of tasks"
        lead="How do you spend your day?">
    <Article><strong>Here</strong> it all begins.</Article>
  </Page>
