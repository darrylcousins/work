/**
 * @file Provides a `login` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faMeh from '@fortawesome/fontawesome-free-regular/faMeh'
import faUserPlus from '@fortawesome/fontawesome-free-solid/faUserPlus'

import Page from '../layout/page'
import Article from '../layout/article'
import { default as LoginForm } from '../auth/login'
import Settings from '../settings'

export default class LoginPage extends React.Component {

  render() {
    let linkStyle = Settings.style.listLink
    return (
      <Page title="Login"
            lead="Login with username and password.">
        <Article>
          <div className={ Settings.style.colLeft }>
            <LoginForm/>
          </div>
          <div className={ Settings.style.colRight }>
            <h3>Other options</h3>
            <ul className="fa-ul">
              <li className="fa-li w-100 tl">
                <FontAwesomeIcon icon={ faUserPlus } color="navy" listItem />
                <Link to="/signup" className={ linkStyle } title="Signup">
                  Signup
                </Link>
              </li>
              <li className="fa-li w-100 tl">
                <FontAwesomeIcon icon={ faMeh } color="navy" listItem />
                <Link to="/password-reset" className={ linkStyle } title="password-reset">
                  Forgot your password?
                </Link>
              </li>
            </ul>
          </div>
        </Article>
      </Page>
    )
  }
}
