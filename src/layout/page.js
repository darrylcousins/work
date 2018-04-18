/**
 * @file Provides a `Page` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { CSSTransition } from 'react-transition-group'

import Title from '../layout/title'
import Lead from '../layout/lead'

/**
 * `Page` provides the title, and lead paragraph
 * @param {string} title
 * @param {component} lead - lead paragraph/subtitle
 * @param {component} children - content
 */
class Page extends React.Component {

  constructor(props) {
    super(props)
    this.state = { in: false }
  }

  componentDidMount() {
    this.setState({ in: true })
  }

  render() {
    var { title, lead, children } = this.props
    return (
      <CSSTransition
        in={ this.state.in }
        timeout={300}
        classNames="fade"
        unmountOnExit
        >
        <div>
          <Title title={ title }/>
          <Lead>{ lead }</Lead>
          { children }
        </div>
      </CSSTransition>
    )
  }
}

export default Page
