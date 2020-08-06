import React, {useEffect, useState} from 'react'
import { getPosts } from './PostHelper';


export default function ShowPost() {

    const [posts, setPost] = useState([]);
    const [error, setError] = useState(false);

    console.log(posts);
    
    const loadAllPosts = () => {
        getPosts().then(
            data=> {
                if(data?.error){
                    setError(data.error)
                    console.log(error)
                }else{
                    console.log(data)
                    setPost(data)
                    
                }
            }
        )}
    
        useEffect(() => {
            loadAllPosts();
        })


    return (
        <div>
            <h3>Post</h3>
            <div className="container">
            {
                posts.status === true ?
                posts.posts.map((post) =>{
                    return(
                    <div className="row card my-4"  key={posts.idposts}>
                        <div className="card-header">
                            {post.title}
                        </div>
                        <div className="card-body">             
                            <p className="card-text">{post.content}</p>
                        </div>
                    </div>)
                })
                
                 : <div>No Posts Available</div>
            }
            
            </div>
        </div>
        
    )
}
