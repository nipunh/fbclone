import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth/user';
import Base from './Layout/Base';

const Login = () => {
    const [values, setValues] = useState({
        email : "",
        password : "",
        error : "",
        didRedirect : false,

    });

    // 
    const {email, password, error,  didRedirect} = values;

    //Handle's change event for login for
    const handleChange = email => event =>{
        event.preventDefault();
        setValues({...values, error: false, [email]: event.target.value})
    };

    //Handle's submit event for login for
    const onSubmit = event => {
        setValues({...values, error:false})
        signin({email, password})
        .then(data => {
                if(data?.error){
                    setValues({...values, error : data.error})
                }else{
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect : true
                        })
                    })
                }
        })}

    //Login Form
    const LogInForm = () => {
        return(
            <div className="container-fluid row">
                <div className="col-lg-7 offset-lg-6 col-md-8 offset-md-2 col-sm-12 offset-sm-3 text-left border rounded shadow bg-light text-dark p-4 my-5">
                <h3 className="text-center font-weight-bold">Login</h3>
                <form >
                    <div className="form-group ">
                         <label  className="form-group font-weight-bold">Email</label>
                         <input 
                         type="email" 
                         className="form-control "  
                         placeholder=" Enter Your email" 
                         onChange = {handleChange("email")}
                         value = {email}
                         />
                    </div>

                    <div className="form-group ">
                        <label className="form-group font-weight-bold">Password</label>
                        <input 
                        type="password" 
                        className="form-control"
                        placeholder="Enter Password"
                        onChange = {handleChange("password")}
                        value = {password}
                        />
                    </div>

                    <div className="form-group form-center ">
                        <button 
                        type="button" 
                        className="btn btn-success btn-block mt-4 mb-2"
                        onClick = {onSubmit}            
                        >Submit</button>
                    </div>
                </form>
                </div>               
            </div>
            )}

    //Performs redirect after successful login
    const performRedirect = () => {
                if(didRedirect){
                        return <Redirect to="/" />
                }
            };

    //Error message on wrong credentials
     const errorMessage = () =>{
                return(
                    <div className="col-lg-8 offset-lg-4 col-md-8 offset-md-2 col-sm-12 offset-sm-3 text-center">
                <div className="alert alert-success"
                    style={{display: error ? "" : "none"}}>
                    <h5>Wrong credentials, please verify user details.</h5>
                        {error}
                </div>
                </div>
                );
            };


    return (
        <Base >
            <div className="container m-lg-5 m-md-1 m-sm-2">
                {errorMessage()}
                {LogInForm()}
                {performRedirect()}
            </div>
        </Base>
    )
}

export default Login;