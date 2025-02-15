    import React, { useState } from 'react';
    import "./addMainService.css";
    import { Link, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import toast from 'react-hot-toast';
    
    const AddMainService = () => {
        const MainServices = {
            name: "",
            info1: "",
            info2:"",
            info3:"",
            info4:"",
            info5:"",
            info6: "",
        
        }
        const [MainService, setMainService] = useState(MainServices);
        const navigate = useNavigate();
        const inputHandler = (e) => {
            const { name, value } = e.target;
            setMainService({ ...MainService, [name]: value });
           
        }
        const submitForm = async(e) => {
            e.preventDefault();
            await axios.post("/api/matra/add-service", MainService)
    
            .then((response) =>{
                toast.success("Add successfully",{position:"top-right"})
                navigate("/main-service");
            }).catch(error => 
            toast.error(error.response.data.message , { position: "top-right" }));
            
        }
        return (
            <div className='addMainService'>
                <Link to={"/main-service"} className='back'>Back</Link>
                <h3>Add new User</h3>
                <form className='addMainServiceForm' onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={inputHandler} id='name' name='name' autoComplete='off' placeholder='name' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="info1">Info1</label>
                        <input type="text" onChange={inputHandler} id='info1' name='info1' autoComplete='off' placeholder='info1' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="info2">Info2</label>
                        <input type="text" onChange={inputHandler} id='info2' name='info2' autoComplete='off' placeholder='info2' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="info3">Info3</label>
                        <input type="text" onChange={inputHandler} id='info3' name='info3' autoComplete='off' placeholder='info3' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="info4">Info4</label>
                        <input type="text" onChange={inputHandler} id='info4' name='info4' autoComplete='off' placeholder='info4' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="info5">Info5</label>
                        <input type="text" onChange={inputHandler} id='info5' name='info5' autoComplete='off' placeholder='info5' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="info6">Info6</label>
                        <input type="text" onChange={inputHandler} id='info6' name='info6' autoComplete='off' placeholder='info6' />
                    </div>
                    <div className="inputGroup">
                        <button type='submit'>Add whyus Title</button>
                    </div>
                </form>
            </div>
        )
    }
    
    export default AddMainService;
    
      