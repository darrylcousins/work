/**
 * @file Provides a `Title` layout component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Settings from '../settings'

/**
 * `Title` provides the layout for a page title
 * @param {string} title - the title
 */
export default ({ title }) =>
    <h1 className={ Settings.style.title }>
      { title }
    </h1>
