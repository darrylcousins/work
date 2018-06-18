/**
 * @file Provides the `App`
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'

import Client from './client'
import Settings from './settings'
import ProfileForNav from './auth/profile-for-nav'

import HomePage from './pages/index'
import LoginPage from './pages/login'
import UserPage from './pages/users'
import ProfilePage from './pages/profile'
import SignUpPage from './pages/signup'
import UpdateProfilePage from './pages/update-profile'
import PasswordResetPage from './pages/password-reset'

import './tachyons.min.css'
import './work.css'

export default () =>
  <ApolloProvider client={ Client }>
    <Router>
      <div className="w-100 sans-serif">
        <div className="center w85">
          <header>
            <div className="w-100 pa3 ph5-ns bg-white">
              <div className="db dt-ns mw9 center w-100">
                <div className="db dtc-ns v-mid tl w-50">
                  <Link to="/" className="f5 f4-ns fw6 mt0 mb1 link black-70 dib" title="Home">
                    Work
                    <div className="dib">
                      <small className="nowrap f6 ml1 mt2 mt3-ns pr2 black-70 fw2">v0.1.0</small>
                    </div>
                  </Link>
                </div>
                <nav className="db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns">
                  <ProfileForNav/>
                  <Link title="School on GitHub"
                    to="https://github.com/darrylcousins/work"
                    className={ Settings.style.navLink }>
                    <FontAwesomeIcon icon={ faGithub } color="navy" />
                    &nbsp;GitHub
                  </Link>
                </nav>
              </div>
            </div>
                <div className="ph3 ph5-ns w-100 bg-transparent pv3 mb1 mb2-ns bt bb b--black-10 overflow-auto">
                  <Link to="/users" title="Users"
                    className={ Settings.style.navLink }>
                    <FontAwesomeIcon icon={ faUsers } color="navy" />
                    &nbsp;Users
                  </Link>
                </div>
          </header>
          <div className="ph3 ph5-ns">
            <div className="cf mw9 tc-m">
              <div className="pb2 pb3-ns pt3 pt4-ns mt0 black-70">
                <div className="ph1 pv1 background-gray tl">
                  <Route exact path="/" component={ HomePage } />
                  <Route exact path="/login" component={ LoginPage } />
                  <Route exact path="/users" component={ UserPage } />
                  <Route exact path="/signup" component={ SignUpPage } />
                  <Route exact path="/password-reset" component={ PasswordResetPage } />
                  <Switch>
                    <Route path="/users/:username/update-profile" component={ UpdateProfilePage } />
                    <Route path="/users/:username" component={ ProfilePage } />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  </ApolloProvider>
