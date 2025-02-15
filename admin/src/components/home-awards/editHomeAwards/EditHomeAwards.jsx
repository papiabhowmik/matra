import React, { useEffect, useState } from 'react';
import "../addHomeAwards/addHomeAwards.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditHomeAwards = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHomeAwards = async () => {
            try {
                const response = await axios.get(`/api/matra/home-single-awards/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].image);
                setContent(response.data[0].content);
                setImage(response.data[0].image);
                
                setImagePreview(`/upload/${response.data[0].image}`);
            } catch (error) {
                console.error("Error fetching the awards:", error);
                toast.error("Failed to load awards data", { position: "top-right" });
            }
        };

        fetchHomeAwards();
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
        formData.append('content', content);
    
        try {
            await axios.put(`/api/matra/update-home-awards/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("awards updated successfully", { position: "top-right" });
            navigate("/home-awards");
        } catch (error) {
            console.error("Error updating awards:", error);
            toast.error("Failed to update awards", { position: "top-right" });
        }
    };
    

    return (
        <div className='addAwards'>
            <Link to="/home-awards" className='back'>Back</Link>
            <h3>Edit awards</h3>
            <form className='addAwardsForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="content">Content</label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter Home Awards content"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="image">Image</label>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Current Home Awards" width="100" />
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
                    <button type="submit">Update Home Awards</button>
                </div>
            </form>
        </div>
    );
};

export default EditHomeAwards;

