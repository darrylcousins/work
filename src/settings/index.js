/**
 * @file Provides a `Settings` object for the application
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
const Settings = {

  /**** styles ****/
  // in general the key is bound to a component or html element
  // all class names are tachyons unless otherwise noted
  "style" : {

    // h1 page title
    "title": "f4 fw6 f1-ns lh-title measure mt0 mb1",

    // lead text beneath title
    "lead": "f5 f4-ns fw4 b measure dib-m lh-copy",

    // html article element
    "article": "tl",

    // the home link element in navbar
    "homeLink": "f5 f4-ns fw6 mt0 mb1 link black-70 dib",

    // a navbar link element
    "navLink": "link dim f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib pointer",

    //*** forms ***//

    // label/input/error/help wrapper
    "inputWrapper": "measure-narrow",

    // form element
    "form": "pa4 black-80 tl",

    // form input messages
    "message": "f6 lh-copy db mb2",

    // default input element style
    "inputDefault": "input-reset ba b--black-20 br2 pa2 mb2 db w-100",

    // error input element style
    "inputError": "input-reset ba b--red br2 pa2 mb2 db w-100",

    // success input element style
    "inputSuccess": "input-reset ba b--dark-green br2 pa2 mb2 db w-100",

    // warning input element style
    "inputWarning": "input-reset ba b--orange br2 pa2 mb2 db w-100",

    // label element
    "label": "f6 b db mb2",

    // input description - here usually a html `small` element
    "inputHelpText": "f6 lh-copy black-60 db mb2",

    // default button element style
    "buttonDefault": "f6 link dim br2 ph3 pv2 mb2 fw8 ba b--dark-gray-black near-black bg-moon-gray",

    // wrap a block in a link - e.g users list
    "blockLink": "pointer",

    //*** lists ***//

    // definition list
    "dlWrapper": "dim mb4",
    "dl": "f6 lh-title mv2 bb b--black-10",
    "dt": "b dark-gray dib",
    "dd": "ml2 gray dib",
  }

}

export default Settings

