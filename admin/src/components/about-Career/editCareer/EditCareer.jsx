import React, { useEffect, useState } from 'react';
import "./editCareer.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditCareer = () => {
    
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const { id } = useParams(); 
    const navigate = useNavigate(); 

    // Fetch the Career data when the component mounts
    useEffect(() => {
        const fetchCareer = async () => {
            try {
                const response = await axios.get(`/api/matra/about-single-career/${id}`);
                setTitle(response.data[0].title);
                setImage(response.data[0].image);
                setDescription(response.data[0].description);
                setImagePreview(`/upload/${response.data[0].image}`);
                } catch (error) {
                console.error("Error fetching the Career:", error);
                toast.error("Failed to load Career data", { position: "top-right" });
            }
        };

        fetchCareer();
    }, [id]); 
    const changeImage = (e) => {
        const file = e.target.files[0];
        // console.log(e.target.files[0]);
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };
    const submitForm = async (e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        } else if (imagePreview) {
            formData.append('image', imagePreview);
        }
        try {
            await axios.put(`/api/matra/update-about-career/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }); // Send PUT request to update Career
            toast.success("Career updated successfully", { position: "top-right" });
            navigate("/about-career"); // Navigate back to the Career list page
        } catch (error) {
            console.error("Error updating Career:", error);
            toast.error("Failed to update Career", { position: "top-right" });
        }
    };

    return (
        <div className='editCareer'>
            <Link to="/about-career" className='back'>Back</Link>
            <h3>Edit Career</h3>
            <form className='editCareerForm' onSubmit={submitForm}>
                
                
                <div className="inputGroup">
                    <label>Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title "
                        
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label>Image</label>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Current Slider" width="100" />
                        </div>
                    )}
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={changeImage}
                        
                    />
                </div>
                
                <div className="inputGroup">
                    <label>Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        
                        required
                    />
                </div>
                <div className="inputGroup">
                    <button type="submit">Update Career</button>
                </div>
            </form>
        </div>
    );
};

export default EditCareer;
