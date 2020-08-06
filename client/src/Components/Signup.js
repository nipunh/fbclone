import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { signup } from '../auth/user'
import Base from './Layout/Base';

const  Signup = () => {

    const [values, setValues] = useState({
        name: "",
        lastname : "",
        email : "",
        password : "",
        error : false,
        success: false,
        loading : false
    });

    const {name, lastname, email, password, error, success, loading} = values;
    

    //Handle's Change event for form
    const handleChange = val => event =>{
        setValues({...values, error: false, [val]: event.target.value})
    };

    //Handle's submit event for form
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading:true})
        signup({name, lastname, email, password})
        .then(data => {
            if(data?.error){
                setValues({...values, error: data.error, success: false, loading:false})
            }
            else{
                console.log("User Registraion Successfull.")
                setValues({
                    ...values,
                    name: "",
                    lastname:"",
                    email : "",
                    password : "",
                    error: "",
                    success: true,
                    loading : false
                })
            }
        })   
}

    //SignUp Form
    const signUpform = () => {
            return(
            <div className="row">
                <div className="col-lg-7 offset-lg-6 col-md-8 offset-md-1  col-sm-12  text-left border shadow rounded bg-light text-dark py-2 mt-1">
                <h3 className="text-center mt-1 font-weight-bold">Sign Up</h3>
                <form className="m-2">
                    <div className="form-group">
                         <label  className="form-group font-weight-bold">Name</label>
                        <input 
                            type="text" 
                            data-error="Please enter Name."
                            className="form-control" 
                            onChange={handleChange("name")} 
                            placeholder=" Enter Your Name, Atleast 3 characters " 
                            value={name}
                            required
                        />
                   </div>
                   <div className="form-group">
                        <label  className="form-group font-weight-bold">Last Name</label>
                        <input 
                            type="text" 
                            required
                            className="form-control" 
                            onChange={handleChange("lastname")} 
                            placeholder=" Enter Your lastname" 
                            value={lastname}
                        />
                   </div>

                    <div className="form-group ">
                         <label  className="form-group font-weight-bold">Email</label> 
                         <input 
                            type="email" 
                            required
                            className="form-control" 
                            onChange={handleChange("email")}  
                            placeholder=" Enter Your Email Address, abc@xyz.com"
                            value={email} 
                         />
                    </div>

                    <div className="form-group ">
                            <label className="form-group font-weight-bold">Password</label>
                            <input 
                                type="password" 
                                className="form-control required"
                                onChange={handleChange("password")}  
                                placeholder="Enter Password, Atleast 6 characters"
                                value={password}
                            />
                    </div>

                    <div className="form-group form-center ">
                        <button type="submit" onClick={onSubmit} className="btn btn-success btn-block mt-4 mb-2">Sign Up</button>
                    </div>

                </form>
                </div>               
            </div>
            
        )
    }

    //Successful user creation message
    const successMessage = () =>{
        return(
            <div className="col-lg-8 offset-lg-4 col-md-10 col-sm-12 text-center">
        <div className="alert alert-success "
            style={{display: success ? "" : "none"}}>
                <h5>New account created successfully. Please</h5>
                <Link to="/login"> Login here.</Link>
        </div>
        </div>
        );
    };

    //Error message
    const errorMessage = () =>{
        return(
        <div className="col-lg-8 offset-lg-4 col-md-10 col-sm-12 text-center">
            <div className="alert alert-danger"
                style={{display: error ? "" : "none"}}>
                    Please Fill all fields in the form
                    {error}
            </div>
        </div>
        );
    };
    
    const loadingMessage = () =>{
        return(
        <div className="col-lg-8 offset-lg-4 col-md-10 col-sm-12 text-center">
            <div className="alert alert-success"
                style={{display: loading ? "" : "none"}}>
                    loading ... <br/>
                    Registering User <br />
                    Please wait... 
            </div>
        </div>
        );
    };


    return (
    <Base> 
        <div className="container m-lg-4 m-sm-3 p-sm-1" >
        {errorMessage()}
        {loadingMessage()}
        {successMessage()}
        {signUpform()}
        </div>
    </Base>
    )
}

export default Signup;