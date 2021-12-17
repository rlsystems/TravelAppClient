import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// interface Props {
//     history: string,
//     location: string,
//     match: string,
//     staticContext: string,
//     to: string,
//     onClick: () => void,
//     // ⬆ filtering out props that `button` doesn’t know what to do with.
//     ...rest: any
// }

const LinkButton = (props: any) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,

   
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props
  return (
    <button 
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default withRouter(LinkButton)