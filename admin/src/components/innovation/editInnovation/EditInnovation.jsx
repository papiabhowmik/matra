import React, { useEffect, useState } from 'react';
import "../addInnovation/addInnovation.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditInnovation = () => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchinnovation = async () => {
            try{
                const response = await axios.get(`/api/matra/get-single-innovation/${id}`);
                setName(response.data[0].name);
                setLink(response.data[0].link);
            }
            catch(error){
                console.error("Error fetching the slider:", error);
                toast.error("Failed to load slider data", { position: "top-right" });
            }
        }
       
        fetchinnovation();
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();
        if (!name.trim() || !link.trim()) {
            toast.error("Title and link cannot be empty", { position: "top-right" });
            return;
        }
        // console.log(setTitle);
        await axios.put(`/api/matra/update-innovation/${id}`, {name, link})

        .then((response) =>{
            toast.success("Update successfully",{position:"top-right"})
            navigate("/innovation");
        }).catch(error => console.log(error));
    }

  return (
    <div className='addInnovation'>
        <Link to={"/innovation"} className='back' >Back</Link>
        <h3>Edit innovation</h3>
        <form className='addInnovationForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="name">name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}  id='name' name='name' autoComplete='off' placeholder='name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="link">link</label>
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)}  id='link' name='link' autoComplete='off' placeholder='link' />
            </div>
            <div className="inputGroup">
                <button type='submit'>Update Innovation</button>
            </div>
        </form>
    </div>
  )
}

export default EditInnovation;

  