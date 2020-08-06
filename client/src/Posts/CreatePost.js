import React, {useState} from 'react'
import { createPost } from './PostHelper'
import { isAuthenticated } from '../auth/user';


const  CreatePost = () => {

    const {user} = isAuthenticated();
    
    const [values, setValues] = useState({
        title: "",
        content : "",
        created_by : "",
        error : false,
        loading : false
    });

    const {title, content,created_by, error, loading} = values;
    

    //Handle's Change event for form
    const handleChange = val => event =>{
        setValues({...values, error: false, [val]: event.target.value})
    };

    //Handle's submit event for form
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, created_by: user.email, error: false, loading:true})
        createPost({title, content, created_by})
        .then(data => {
            if(data?.error){
                setValues({...values, error: data.error, success: false, loading:false})
            }
            else{
                console.log("Upload Successfull.")
                setValues({
                    ...values,
                    title: "",
                    content:"",
                    created_by : "",
                    error: "",
                    success: true,
                    loading : false
                })
            }
        })   
}

    //CreatePostForm
    const CreatePostForm = () => {
            return(
            <div className="row">
                <div className="col-lg-7 offset-lg-6 col-md-8 offset-md-1  col-sm-12  text-left border shadow rounded bg-light text-dark py-2 mt-1">
                <h3 className="text-center mt-1 font-weight-bold">Create Post</h3>
                <form className="m-2">
                    <div className="form-group">
                         <label  className="form-group font-weight-bold">Title</label>
                        <input 
                            type="text" 
                            data-error="Please enter title."
                            className="form-control" 
                            onChange={handleChange("title")} 
                            placeholder=" Enter Your title" 
                            value={title}
                            required
                        />
                   </div>
                   <div className="form-group">
                        <label  className="form-group font-weight-bold">content</label>
                        <input 
                            type="text-area" 
                            required
                            className="form-control" 
                            onChange={handleChange("content")} 
                            placeholder=" Enter psot content" 
                            value={content}
                        />
                   </div>

                    <div className="form-group form-center ">
                        <button type="submit" onClick={onSubmit} className="btn btn-success btn-block mt-4 mb-2">Upload</button>
                    </div>

                </form>
                </div>               
            </div>
            
        )
    }

    //Successful user creation message
    // const successMessage = () =>{
    //     return(
    //         <div className="col-lg-8 offset-lg-4 col-md-10 col-sm-12 text-center">
    //     <div className="alert alert-success "
    //         style={{display: success ? "" : "none"}}>
    //             <h5>Uploaded successfully</h5>
                
    //     </div>
    //     </div>
    //     );
    // };

    //Error message
    const errorMessage = () =>{
        return(
        <div className="col-lg-8 offset-lg-4 col-md-10 col-sm-12 text-center">
            <div className="alert alert-danger"
                style={{display: error ? "" : "none"}}>
                    Error Uploading
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
                    Creating Post <br />
                    Please wait... 
            </div>
        </div>
        );
    };


    return (
     
        <div className="container m-lg-4 m-sm-3 p-sm-1" >
            {errorMessage()}
            {loadingMessage()}
            {CreatePostForm()}
        </div>
    
    )
}

export default CreatePost;