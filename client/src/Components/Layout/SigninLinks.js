import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { signout } from '../../auth/user'


export const SigninLinks = () => {
    return (
            <li className="nav-item mx-2">
                <Link to='/' className="nav-link"  onClick={()=>{
                        signout(() => {
                            return(
                            <Redirect to="/" />
                            )
                        })
                    }}>Logout</Link>     
            </li>
    )
}
