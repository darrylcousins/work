/**
 * @file Provides an `Message` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import Settings from '../settings'

export default (props) => {

  const { name, type, messages } = props

  if (!(name in messages)) return null

  const color = type === "error" && "red"
  const text = messages[name]

  return (
    <div className={ Settings.style.message }>
      <span className={ color }>{ text }</span>
    </div>
  )
}
