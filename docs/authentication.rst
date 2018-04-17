Authentication
==============

The application uses JWT authentication tokens to authenticate users with the backend server.

Backend
-------

The backend exposes a graphql mutation that logs a user in and issues a JWT
autentication token that it will continue to recognise in the headers with
subsequent requests.

Login
-----

The login form performs validation including verifying username with the backend and the exposed graphql mutation which returns the token, username, and userid. With these values the token is saved in ``localStorage`` and local user details are stored with `apollo-client`_::

  localStorage.setItem("token", result.tokenAuth.token)
  Client.mutate(
    { mutation: setLocalUser,
      variables: {
        username: result.username,
        id: result.uid
      }
    }
  )

Headers
-------

The token is included in every request with `apollo-client`_::

  const authLink = setContext((request, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
      }
    }
  })

Logout
------

Logout is provided by ``profile-for-nav.js`` with the method::

  logout() {
    localStorage.removeItem("token")
    Client.resetStore()
  }

To do:
------

  * add ``refresh-token`` and ``verify-token``
.. _apollo-client: https://www.apollographql.com/docs/react/
