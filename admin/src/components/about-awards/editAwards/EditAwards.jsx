import React, { useEffect, useState } from 'react';
import "../addAwards/addAwards.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditAwards = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await axios.get(`/api/matra/about-single-awards/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].image);
                
                setImage(response.data[0].image);
                setTitle(response.data[0].title);
                setYear(response.data[0].year);
                setDescription(response.data[0].description);
                
                setImagePreview(`/upload/${response.data[0].image}`);
            } catch (error) {
                console.error(error.response.data.message);
                toast.error(error.response.data.message , { position: "top-right" });
            }
        };

        fetchAwards();
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
        
        
        // console.log(image);
        // console.log(imagePreview);
        
        if (image) {
            formData.append('image', image);
        } else if (imagePreview) {
            formData.append('image', imagePreview);
        }
        formData.append('year', year);
        formData.append('title', title);
        formData.append('description', description);
    
        try {
            await axios.put(`/api/matra/update-about-awards/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("awards updated successfully", { position: "top-right" });
            navigate("/about-awards");
        } catch (error) {
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
    };
    

    return (
        <div className='addAwards'>
            <Link to="/about-awards" className='back'>Back</Link>
            <h3>Edit awards</h3>
            <form className='addAwardsForm' onSubmit={submitForm}>
                
                <div className="inputGroup">
                    <label htmlFor="image">Image</label>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Current  Awards" width="100" />
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
                    <label htmlFor="year">Year</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter Awards year"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Awards title"
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
                        placeholder="Enter  Awards description"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <button type="submit">Update  Awards</button>
                </div>
            </form>
        </div>
    );
};

export default EditAwards;

