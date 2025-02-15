import React, { useEffect, useState } from 'react';
import "../addSlider/addSlider.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditSlider = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSlider = async () => {
            try {
                const response = await axios.get(`/api/matra/get-single-slider/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].image);
                setName(response.data[0].title);
                setImage(response.data[0].image);
                
                setImagePreview(`/upload/${response.data[0].image}`);
            } catch (error) {
                console.error("Error fetching the slider:", error);
                toast.error("Failed to load slider data", { position: "top-right" });
            }
        };

        fetchSlider();
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
        formData.append('title', name);
        
        // console.log(image);
        // console.log(imagePreview);
        
        if (image) {
            formData.append('image', image);
        } else if (imagePreview) {
            formData.append('image', imagePreview);
        }
    
        try {
            await axios.put(`/api/matra/update-home-slider/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Slider updated successfully", { position: "top-right" });
            navigate("/home-slider");
        } catch (error) {
            console.error("Error updating slider:", error);
            toast.error("Failed to update slider", { position: "top-right" });
        }
    };
    

    return (
        <div className='addSlider'>
            <Link to="/home-slider" className='back'>Back</Link>
            <h3>Edit Slider</h3>
            <form className='addSliderForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter slider title"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="image">Image</label>
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
                    <button type="submit">Update Slider</button>
                </div>
            </form>
        </div>
    );
};

export default EditSlider;

