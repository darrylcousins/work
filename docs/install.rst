Install
=======

The steps to get started.

Create a react starter app::

  $ cd .virtualenvs
  $ npx create-react-app work

Python virtual environment::

  $ cd work
  $ virtualenv -p python3 .
  $ source bin/activate

Install `nodeenv` into same directory and activate::

  $ pip install nodeenv
  $ nodeenv -p
  $ source bin/activate

With local `npm` install `react-router`::

  (work) $ npm install --save react-router react-router-dom

Install `react`/`apollo`/`graphql` stack::

  (work) $ npm install --save apollo-boost apollo-link-context react-apollo graphql-tag graphql

`react-form`::

  (work) $ npm install --save react-form

`redux`/`react-redux` NO - use apollo link::

  (work) $ npm install --save redux react-redux

Other helpers, helmet for html head inserts::

  (work) $ npm install --save react-helmet


