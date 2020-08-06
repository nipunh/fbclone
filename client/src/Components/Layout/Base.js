import React from 'react'
import Navbar from './Navbar';


const Base = ({
    className = "text-black p-4",
    children }) => {
    return (
        
            <div className="">
                <Navbar />
                 
                <div className="container-fluid">
                    <div className = "text-black bg-white text-center ">
                        <div className={className}>{children}</div>
                </div>                
                
                </div>
        </div>   
    )
}

export default Base; 