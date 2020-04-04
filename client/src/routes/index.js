import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import { AnimatedSwitch, spring } from 'react-router-transition'

import { Home } from './../containers'

const bounceTransition = {
    atEnter: {
      opacity: 0
    },
    atLeave: {
      opacity: bounce(1),
      transform: -100
    },
    atActive: {
      opacity: bounce(1)
    }
}
  
function mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `translateX(${styles.transform}%)`
    }
}

function bounce(val) {
    return spring(val, {
      stiffness: 170,
      damping: 17
    })
}

class BaseRoutes extends Component {
    render() {
        return (
            <AnimatedSwitch
                atEnter={bounceTransition.atEnter}
                atLeave={bounceTransition.atLeave}
                atActive={bounceTransition.atActive}
                mapStyles={mapStyles}
                location={this.props.location}
                
            >
                <Route exact path="/" component={Home} />
            </AnimatedSwitch>
        )
    }
}

export default withRouter(BaseRoutes)
