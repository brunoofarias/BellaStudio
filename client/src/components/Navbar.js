import React from 'react'
import Instagram from '../icons/instragam'

const Navbar = () => {
    return (
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img src="/images/logo.png" width="180" height="180" alt="Logo Bella"/>
            </div>
            <a href="https://www.instagram.com/bellastudiohairgv/" style={{ color: '#e67e22' }} rel="noopener noreferrer" target="_blank">
                <Instagram />
            </a>
        </div>
    )
}

export default Navbar
