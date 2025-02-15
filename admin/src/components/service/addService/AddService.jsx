import React, { useState } from 'react';
import "./addService.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddService = () => {
    const [title,setTitle] = useState('');
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('');

    const navigate = useNavigate();
    const submitForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',title);
        formData.append('image',image);
        formData.append('description',description);
        try{
             await axios.post("/api/matra/add-home-service", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            toast.success("Add successfully",{position:"top-right"})
            navigate("/home-service");
        }catch(error){
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
        
    };
    return (
        <div className='addService'>
            <Link to={"/home-service"} className='back'>Back</Link>
            <h3>Add new Service</h3>
            <form className='addServiceForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} id='title' name='title' autoComplete='off' placeholder='title' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="image">image</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} id='image' name='image' autoComplete='off' placeholder='image' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="description">Description</label>
                    <input type="text"  onChange={(e) => setDescription(e.target.value)} id='description' name='description' autoComplete='off' placeholder='description' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add Service</button>
                </div>
            </form>
        </div>
    )
}

export default AddService;

  