import API from "../backend";

export const createPost = post => {
    return fetch(`${API}post/create`, {
        method: "POST",
        headers: {  
            Accept: "application/json",
            "Content-Type" :"application/json",
        },
        body: JSON.stringify(post)
    })
    .then(response =>{
        console.log(response);
        return response.json();
    })
    .catch( err => console.log(err));
};

export const getPosts = () => {
    return fetch(`${API}post/show`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}