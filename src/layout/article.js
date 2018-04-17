/**
 * @file Provides an `Article` layout component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Settings from '../settings'

/**
 * `Article` provides the layout for an block of content
 * @param {component} children - content
 */
export default ({ children }) =>
  <article className={ Settings.style.article }>
    { children }
  </article>
