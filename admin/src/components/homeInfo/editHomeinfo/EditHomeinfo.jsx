import React, { useEffect, useRef, useState } from 'react';
import "./editHomeinfo.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';

const EditHomeinfo = () => {
    const editor=useRef(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const { id } = useParams(); 
    const navigate = useNavigate(); 

    // Fetch the homeinfo data when the component mounts
    useEffect(() => {
        const fetchHomeinfo = async () => {
            try {
                const response = await axios.get(`/api/matra/homeinfo-single/${id}`);
                setTitle(response.data[0].title);
                setImage(response.data[0].image);
                setContent(response.data[0].content);
                setDescription(response.data[0].description);
                setImagePreview(`/upload/${response.data[0].image}`);
                } catch (error) {
                console.error("Error fetching the homeinfo:", error);
                toast.error("Failed to load homeinfo data", { position: "top-right" });
            }
        };

        fetchHomeinfo();
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
        formData.append('content', content);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        } else if (imagePreview) {
            formData.append('image', imagePreview);
        }
        try {
            await axios.put(`/api/matra/update-home-info/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }); // Send PUT request to update homeinfo
            toast.success("homeinfo updated successfully", { position: "top-right" });
            navigate("/home-info"); // Navigate back to the homeinfo list page
        } catch (error) {
            console.error("Error updating homeinfo:", error);
            toast.error("Failed to update homeinfo", { position: "top-right" });
        }
    };

    return (
        <div className='editHomeinfo'>
            <Link to="/home-info" className='back'>Back</Link>
            <h3>Edit homeinfo</h3>
            <form className='editHomeinfoForm' onSubmit={submitForm}>
                
                
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
                    <label>Content</label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter content"
                        
                        required
                    />
                </div>
                <div className="">
                    <label>Description</label>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        onChange={newDescription =>  setDescription(newDescription)}
                    />
                    {/* <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        
                        required
                    /> */}
                </div>
                <div className="inputGroup">
                    <button type="submit">Update homeinfo</button>
                </div>
            </form>
            {description}
        </div>
    );
};

export default EditHomeinfo;
