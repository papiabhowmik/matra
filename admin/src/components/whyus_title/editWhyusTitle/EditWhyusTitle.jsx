import React, { useEffect, useState } from 'react';
import "../addWhyusTitle/addWhyusTitle.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditWhyusTitle = () => {
    const [title, setTitle] = useState('');
    
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchWhyus = async () => {
            try{
                const response = await axios.get(`/api/matra/get-single-whyus-title/${id}`);
                setTitle(response.data[0].title);
                
            }
            catch(error){
                console.error("Error fetching the slider:", error);
                toast.error("Failed to load slider data", { position: "top-right" });
            }
        }
       
        fetchWhyus();
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Title cannot be empty", { position: "top-right" });
            return;
        }
        // console.log(setTitle);
        await axios.put(`/api/matra/update-whyus-title/${id}`, {title})

        .then((response) =>{
            toast.success("Update successfully",{position:"top-right"})
            navigate("/whyus-title");
        }).catch(error => console.log(error));
    }

  return (
    <div className='addwhyusTitle'>
        <Link to={"/whyus-title"} className='back' >Back</Link>
        <h3>Edit Whyus Title</h3>
        <form className='addwhyusTitleForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="title">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  id='title' name='title' autoComplete='off' placeholder='title' />
            </div>
            
            <div className="inputGroup">
                <button type='submit'>Update whyusTitle</button>
            </div>
        </form>
    </div>
  )
}

export default EditWhyusTitle

  