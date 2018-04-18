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

import Client from './client'
import Settings from './settings'
import ProfileForNav from './auth/profile-for-nav'

import Home from './pages/index'
import Login from './pages/login'
import Users from './users'
import Profile from './users/profile'
import SignUp from './pages/signup'

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
                  <Link to="/" className={ Settings.style.homeLink } title="Home">
                    Work
                    <div className="dib">
                      <small className="nowrap f6 ml1 mt2 mt3-ns pr2 black-70 fw2">v0.0.0</small>
                    </div>
                  </Link>
                </div>
                <nav className="db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns">
                  <ProfileForNav/>
                  <Link to="/signup" className={ Settings.style.navLink } title="Signup">
                    Signup
                  </Link>
                  <Link title="School on GitHub"
                    to="https://github.com/darrylcousins/work"
                    className={ Settings.style.navLink }>
                    GitHub
                  </Link>
                </nav>
              </div>
            </div>
                <div className="ph3 ph5-ns w-100 bg-transparent pv3 mb1 mb2-ns bt bb b--black-10 overflow-auto">
                  <Link to="/users" title="Users"
                    className={ Settings.style.navLink }>
                    Users
                  </Link>
                </div>
          </header>
          <div className="ph3 ph5-ns">
            <div className="cf mw9 tc-m">
              <div className="pb3 pb4-ns pt3 pt4-ns mt0 black-70">
                <div className="ph3 pv1 background-gray tl">
                  <Route exact path="/" component={ Home } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/users" component={ Users } />
                  <Route exact path="/signup" component={ SignUp } />
                  <Switch>
                    <Route path="/users/:username" component={ Profile } />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  </ApolloProvider>
