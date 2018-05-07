/**
 * @file Provides a `Lead` layout component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

/**
 * `Lead` provides the layout for a lead paragraph/subtitle
 * @param {component} children - content
 */
export default ({ children }) =>
  <p className="f5 f4-ns fw4 b measure dib-m lh-copy">
    { children }
  </p>
