import React, { useState } from 'react';
import "./addAwards.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddAwards = () => {
    const [title,setTitle] = useState('');
    const [image,setImage] = useState('');
    const [year,setYear] = useState('');
    const [description,setDescription] = useState('');

    const navigate = useNavigate();
    const submitForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        // console.log(title);
        formData.append('title',title);
        formData.append('image',image);
        formData.append('year',year);
        formData.append('description',description);
        try{
             await axios.post("/api/matra/add-about-awards", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            toast.success("Add successfully",{position:"top-right"})
            navigate("/about-awards");
        }catch(error){
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
        
    };
    return (
        <div className='addAwards'>
            <Link to={"/about-awards"} className='back'>Back</Link>
            <h3>Add new Award</h3>
            <form className='addAwardsForm' onSubmit={submitForm}>
                
                <div className="inputGroup">
                    <label htmlFor="image">Image</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} id='image' name='image' autoComplete='off' placeholder='image' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="year">Year</label>
                    <input type="text" onChange={(e) => setYear(e.target.value)} id='year' name='year' autoComplete='off' placeholder='year' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} id='title' name='title' autoComplete='off' placeholder='title' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} id='description' name='description' autoComplete='off' placeholder='description' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add Award</button>
                </div>
            </form>
        </div>
    )
}

export default AddAwards;

  