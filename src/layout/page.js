/**
 * @file Provides a `Page` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Client from '../client'
import Title from '../layout/title'
import Lead from '../layout/lead'

/**
 * `Page` provides the title, and lead paragraph
 * @param {string} title
 * @param {component} lead - lead paragraph/subtitle
 * @param {component} children - content
 */
export default ({ title, lead, children, ...props }) =>
  <div>
    <Title title={ title }/>
    <Lead>{ lead }</Lead>
    { children }
  </div>
