import React, { useEffect, useState } from 'react';
import "../addWhyusContent/addWhyusContent.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditWhyusContent = () => {
    const [title_id,setTitle_id] = useState('');
    const [image,setImage] = useState('');
    const [content,setContent] = useState('');
    const [description,setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [titles, setTitles] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await axios.get('/api/matra/get-whyus-title');
                setTitles(response.data); // Assuming the response contains an array of titles
            } catch (error) {
                console.error("Error fetching titles:", error);
                toast.error("Failed to load titles", { position: "top-right" });
            }
        };

        fetchTitles();

        const fetchWhyusContent = async () => {
            try {
                const response = await axios.get(`/api/matra/get-single-whyus/${id}`);
                // console.log(response.data[0].title);
                 console.log(response.data[0]);
                setTitle_id(response.data[0].title_id);
                setImage(response.data[0].logo);
                setContent(response.data[0].content);
                setDescription(response.data[0].description);
                
                setImagePreview(`/upload/${response.data[0].logo}`);
            } catch (error) {
                console.error("Error fetching the WhyusContent:", error);
                toast.error("Failed to load WhyusContent data", { position: "top-right" });
            }
        };

        fetchWhyusContent();
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
        formData.append('title_id', title_id);
        formData.append('content', content);
        formData.append('description', description);
        
        // console.log(image);
        // console.log(imagePreview);
        
        if (image) {
            formData.append('image', image);
        } else if (imagePreview) {
            formData.append('image', imagePreview);
        }
    
        try {
            await axios.put(`/api/matra/update-whyus/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("WhyusContent updated successfully", { position: "top-right" });
            navigate("/whyus");
        } catch (error) {
            console.error("Error updating WhyusContent:", error);
            toast.error("Failed to update WhyusContent", { position: "top-right" });
        }
    };
    

    return (
        <div className='addWhyusContent'>
            <Link to="/whyus" className='back'>Back</Link>
            <h3>Edit WhyusContent</h3>
            <form className='addWhyusContentForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title_id">Title</label>
                    <select
                        id="title_id"
                        name="title_id"
                        value={title_id}
                        onChange={(e) => setTitle_id(e.target.value)}
                        required
                    >
                        <option value="">Select a title</option>
                        {titles.map((title) => (
                            <option key={title.id} value={title.id}>
                                {title.title} {/* Adjust to match the key in your response */}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="inputGroup">
                    <label htmlFor="image">Logo</label>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Current WhyusContent" width="100" />
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
                    <label htmlFor="content">Content</label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter WhyusContent content"
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
                        placeholder="Enter WhyusContent description"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <button type="submit">Update WhyusContent</button>
                </div>
            </form>
        </div>
    );
};

export default EditWhyusContent;
