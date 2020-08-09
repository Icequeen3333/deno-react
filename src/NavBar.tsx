import React from 'react'
import PropTypes from 'prop-types'

const NavBar = ({ logout }: { logout: () => void } ) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item" style={{float:'right'}}><a className="nav-link" href="/" onClick={logout}>Logout</a></li>
            </ul>
        </nav>
    );
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired
}

export default NavBar;