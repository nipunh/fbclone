import React from 'react'
import { Link} from 'react-router-dom';
import { isAuthenticated} from '../../auth/user';
import { SignoutLinks } from './SignoutLinks';
import { SigninLinks } from './SigninLinks';


const Navbar = () => {
    const links = isAuthenticated() ? <SigninLinks /> : <SignoutLinks />
    return (
        <nav 
        className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Facebook</a>
            <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-2">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    {links}
                    </ul>
                </div>
            </nav>        
        )
    }

    export default Navbar;
