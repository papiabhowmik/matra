import React, { useState } from 'react';
import "./addSlider.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddSlider = () => {
    const [name,setName] = useState('');
    const [image,setImage] = useState('');

    const navigate = useNavigate();
    const submitForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',name);
        formData.append('image',image);
        try{
             await axios.post("/api/matra/add-home-slider", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            toast.success("Add successfully",{position:"top-right"})
            navigate("/home-slider");
        }catch(error){
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
        
    };
    return (
        <div className='addSlider'>
            <Link to={"/home-slider"} className='back'>Back</Link>
            <h3>Add new Slider</h3>
            <form className='addSliderForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} id='title' name='title' autoComplete='off' placeholder='title' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="image">image</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} id='image' name='image' autoComplete='off' placeholder='image' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add Slider</button>
                </div>
            </form>
        </div>
    )
}

export default AddSlider;

  