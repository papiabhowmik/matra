import React, { useEffect, useState } from 'react';
import "./editAboutOverview.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditOverview = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const response = await axios.get(`/api/matra/single-about-overview/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].description);
                setTitle(response.data[0].title);
                setDescription(response.data[0].description);
                
            } catch (error) {
                console.error("Error fetching the slider:", error);
                toast.error("Failed to load slider data", { position: "top-right" });
            }
        };

        fetchOverview();
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()){
            toast.error("All fields are required", { position: "top-right" });
            return;
        }
        
        await axios.put(`/api/matra/update-about-overview/${id}`, {title, description})
                
        .then((response) =>{
            toast.success("Update successfully",{position:"top-right"})
            navigate("/about-overview");
        }).catch(error => console.log(error));
    };
    

    return (
        <div className='addOverview'>
            <Link to="/about-overview" className='back'>Back</Link>
            <h3>Edit Overview</h3>
            <form className='addOverviewForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter overview title"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter overview description"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <button type="submit">Update Overview</button>
                </div>
            </form>
        </div>
    );
};

export default EditOverview;

