/**
 * @file Provides a `password-reset` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Page from '../layout/page'
import Article from '../layout/article'
import PasswordReset from '../users/password-reset'

export default class PasswordResetPage extends React.Component {

  render() {
    return (
      <Page title="Password reset"
            lead="Reset your password.">
        <Article>
          <PasswordReset/>
        </Article>
      </Page>
    )
  }
}

