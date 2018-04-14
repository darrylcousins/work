import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// imports for console testing
import gql from 'graphql-tag'
import Client from './client'
import {
  getLocalUser,
  setLocalUser
} from './auth/queries'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

window.Client = Client
window.gql = gql
window.getLocalUser = getLocalUser
window.setLocalUser = setLocalUser
