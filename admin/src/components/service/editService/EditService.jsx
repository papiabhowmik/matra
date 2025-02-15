import React, { useEffect, useState } from 'react';
import "../addService/addService.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditService = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`/api/matra/home-single-service/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].image);
                setTitle(response.data[0].title);
                setImage(response.data[0].image);
                setDescription(response.data[0].description);
                setImagePreview(`/upload/${response.data[0].image}`);
            } catch (error) {
                console.error("Error fetching the service:", error);
                toast.error("Failed to load service data", { position: "top-right" });
            }
        };

        fetchService();
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
        // console.log(image);
        // console.log(imagePreview);
        
        if (image) {
            formData.append('image', image);
        } else if (imagePreview) {
            formData.append('image', imagePreview);
        }
    
        try {
            await axios.put(`/api/matra/update-home-service/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("service updated successfully", { position: "top-right" });
            navigate("/home-service");
        } catch (error) {
            console.error("Error updating service:", error);
            toast.error("Failed to update service", { position: "top-right" });
        }
    };
    

    return (
        <div className='addService'>
            <Link to="/home-service" className='back'>Back</Link>
            <h3>Edit service</h3>
            <form className='addServiceForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter service title"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="image">Image</label>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Current service" width="100" />
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
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter service description"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <button type="submit">Update Service</button>
                </div>
            </form>
        </div>
    );
};

export default EditService;

