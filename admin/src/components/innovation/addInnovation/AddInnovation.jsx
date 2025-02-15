import React, { useState } from 'react';
import "./addInnovation.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddInnovation = () => {
    const Innovations = {
        name: "",
        link: "",
    
    }
    const [Innovation, setInnovation] = useState(Innovations);
    const navigate = useNavigate();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInnovation({ ...Innovation, [name]: value });
       
    }
    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("/api/matra/add-innovation", Innovation)

        .then((response) =>{
            toast.success("Add successfully",{position:"top-right"})
            navigate("/innovation");
        }).catch(error => 
        toast.error(error.response.data.message , { position: "top-right" }));
        
    }
    return (
        <div className='addInnovation'>
            <Link to={"/innovation"} className='back'>Back</Link>
            <h3>Add new User</h3>
            <form className='addInnovationForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={inputHandler} id='name' name='name' autoComplete='off' placeholder='name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="link">Link</label>
                    <input type="text" onChange={inputHandler} id='link' name='link' autoComplete='off' placeholder='link' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add Innovation</button>
                </div>
            </form>
        </div>
    )
}

export default AddInnovation;

  