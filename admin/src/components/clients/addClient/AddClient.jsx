import React, { useState } from 'react';
import "./addClient.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddClient = () => {
    const [image, setImage] = useState('');
   
    const navigate = useNavigate();
    
    const submitForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        try{
            await axios.post("/api/matra/add-home-clients", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            toast.success("Add successfully",{position:"top-right"})
            navigate("/home-client");
        }catch(error){
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
        
    };
    return (
        <div className='addClient'>
            <Link to={"/home-client"} className='back'>Back</Link>
            <h3>Add new Client</h3>
            <form className='addClientForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="image">image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} id='image' name='image' placeholder='image' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add Client</button>
                </div>
            </form>
        </div>
    )
}

export default AddClient;

  