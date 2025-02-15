import React, { useEffect, useState } from 'react';
import "../addMainService/addMainService.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditMainService = () => {
    const [name, setName] = useState('');
    const [info1, setInfo1] = useState('');
    const [info2, setInfo2] = useState('');
    const [info3, setInfo3] = useState('');
    const [info4, setInfo4] = useState('');
    const [info5, setInfo5] = useState('');
    const [info6, setInfo6] = useState('');
    
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchService = async () => {
            try{
                const response = await axios.get(`/api/matra/get-single-service/${id}`);
                setName(response.data[0].name);
                setInfo1(response.data[0].info1);
                setInfo2(response.data[0].info2);
                setInfo3(response.data[0].info3);
                setInfo4(response.data[0].info4);
                setInfo5(response.data[0].info5);
                setInfo6(response.data[0].info6);

                
            }
            catch(error){
                console.error("Error fetching the slider:", error);
                toast.error("Failed to load slider data", { position: "top-right" });
            }
        }
        
        fetchService();
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Name cannot be empty", { position: "top-right" });
            return;
        }
        if (!info1.trim()) {
            toast.error("Info1 cannot be empty", { position: "top-right" });
            return;
        }
        // console.log(setTitle);
        await axios.put(`/api/matra/update-service/${id}`, {name, info1, info2, info3, info4, info5, info6})

        .then((response) =>{
            toast.success("Update successfully",{position:"top-right"})
            navigate("/main-service");
        }).catch(error => console.log(error));
    }

    return (
    <div className='addMainService'>
        <Link to={"/main-service"} className='back' >Back</Link>
        <h3>Edit Whyus Title</h3>
        <form className='addMainServiceForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="name">name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}  id='name' name='name' autoComplete='off' placeholder='name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="info1">Info1</label>
                <input type="text" value={info1} onChange={(e) => setInfo1(e.target.value)}  id='info1' name='info1' autoComplete='off' placeholder='info1' />
            </div>
            <div className="inputGroup">
                <label htmlFor="info2">Info2</label>
                <input type="text" value={info2} onChange={(e) => setInfo2(e.target.value)}  id='info2' name='info2' autoComplete='off' placeholder='info2' />
            </div>
            <div className="inputGroup">
                <label htmlFor="info3">Info3</label>
                <input type="text" value={info3} onChange={(e) => setInfo3(e.target.value)}  id='info3' name='info3' autoComplete='off' placeholder='info3' />
            </div>
            <div className="inputGroup">
                <label htmlFor="info4">Info4</label>
                <input type="text" value={info4} onChange={(e) => setInfo4(e.target.value)}  id='info4' name='info4' autoComplete='off' placeholder='info4' />
            </div>
            <div className="inputGroup">
                <label htmlFor="info5">Info5</label>
                <input type="text" value={info5} onChange={(e) => setInfo5(e.target.value)}  id='info5' name='info5' autoComplete='off' placeholder='info5' />
            </div><div className="inputGroup">
                <label htmlFor="info6">Info6</label>
                <input type="text" value={info6} onChange={(e) => setInfo6(e.target.value)}  id='info6' name='info6' autoComplete='off' placeholder='info6' />
            </div>
            <div className="inputGroup">
                <button type='submit'>Update MainService</button>
            </div>
        </form>
    </div>
    )
}

export default EditMainService

    