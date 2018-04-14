Structure
=========

This documents the choices made in determining file structure.

An attempt is being made in development to separate modules by functionality.
So we have only ``index`` in components.

Components
----------

Only the index home page component here.

Client
------

The apollo client defintion.

Settings
--------

Global settings, currently only ``style`` settings are included here which uses
`tachyons`_ to style dom components.

Forms
-----

Form components using `react-form`_.

Layout
------

Simple layout components including ``title, page, lead, article``.

Auth
----

Components and support utilities for the authentication. It was this module
that prompted the file structure defined here. The thinking being that it may
be able to be pulled out of the application as an installable module.

The ``auth`` module contains components that provide a login form and a
profile-for-nav module. In addition are `apollo-client`_ queries and resolvers.

.. _tachyons: https://tachyons.io
.. _react-form: https://react-form.js.org
.. _apollo-client: https://www.apollographql.com/docs/react/
