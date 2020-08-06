import React from 'react'
import Base from './Layout/Base';
import CreatePost from '../Posts/CreatePost';
import ShowPost from '../Posts/ShowPost';
import { isAuthenticated } from '../auth/user';
import { Link } from 'react-router-dom';


const Home = () => {



    const home = () =>{
        return(
            <div>
            <h1>Home</h1>
            </div>
        )
    }
    return (
        <Base>
            <div>{home()}</div>
            {isAuthenticated() && <CreatePost />}
            {isAuthenticated() && <ShowPost /> }
            {!isAuthenticated() && 
                <div className="alert alert-success">
                    <h5>Login to see and create posts.</h5>
                    <Link to="/login"> Login here</Link>
                </div>
                }  
        </Base>
    )
}

export default Home;