import React, { useState } from 'react';
import "./addWhyusTitle.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddWhyusTitle = () => {
    const whyusTitles = {
        title: "",
    
    }
    const [whyusTitle, setwhyusTitle] = useState(whyusTitles);
    const navigate = useNavigate();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setwhyusTitle({ ...whyusTitle, [name]: value });
       
    }
    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("/api/matra/add-whyus-title", whyusTitle)

        .then((response) =>{
            toast.success("Add successfully",{position:"top-right"})
            navigate("/whyus-title");
        }).catch(error => 
        toast.error(error.response.data.message , { position: "top-right" }));
        
    }
    return (
        <div className='addwhyusTitle'>
            <Link to={"/whyus-title"} className='back'>Back</Link>
            <h3>Add new User</h3>
            <form className='addwhyusTitleForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={inputHandler} id='title' name='title' autoComplete='off' placeholder='title' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add whyus Title</button>
                </div>
            </form>
        </div>
    )
}

export default AddWhyusTitle;

  