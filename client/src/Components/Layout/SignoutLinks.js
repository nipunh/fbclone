import React, {Fragment} from 'react'
import { NavLink } from 'react-router-dom'

export const SignoutLinks = () => {
    return (
            <Fragment>
                <li className="nav-item mx-2">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item mx-2">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
            </Fragment>
    
    )
}
