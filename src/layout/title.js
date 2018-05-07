/**
 * @file Provides a `Title` layout component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

/**
 * `Title` provides the layout for a page title
 * @param {string} title - the title
 */
export default ({ title }) =>
  <h1 className="f4 fw6 f1-ns lh-title measure mt0 mb1">
    { title }
  </h1>
