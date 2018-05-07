/**
 * @file Provides an `Article` layout component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

/**
 * `Article` provides the layout for an block of content
 * @param {component} children - content
 */
export default ({ children }) =>
  <article className="tl">
    { children }
  </article>
