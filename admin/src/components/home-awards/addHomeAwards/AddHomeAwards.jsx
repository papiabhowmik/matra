import React, { useState } from 'react';
import "./addHomeAwards.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddHomeAwards = () => {
    const [content,setContent] = useState('');
    const [image,setImage] = useState('');

    const navigate = useNavigate();
    const submitForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content',content);
        formData.append('image',image);
        try{
             await axios.post("/api/matra/add-home-awards", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            toast.success("Add successfully",{position:"top-right"})
            navigate("/home-awards");
        }catch(error){
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
        
    };
    return (
        <div className='addAwards'>
            <Link to={"/home-awards"} className='back'>Back</Link>
            <h3>Add new Award</h3>
            <form className='addAwardsForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="content">Content</label>
                    <input type="text" onChange={(e) => setContent(e.target.value)} id='content' name='content' autoComplete='off' placeholder='content' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="image">image</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} id='image' name='image' autoComplete='off' placeholder='image' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add Award</button>
                </div>
            </form>
        </div>
    )
}

export default AddHomeAwards;

  