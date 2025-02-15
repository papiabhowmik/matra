import React, { useEffect, useState } from 'react';
import "../addProject/addProject.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditProject = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`/api/matra/home-single-project/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].image);
                setTitle(response.data[0].title);
                setImage(response.data[0].image);
                
                setImagePreview(`/upload/${response.data[0].image}`);
            } catch (error) {
                console.error("Error fetching the project:", error);
                toast.error("Failed to load project data", { position: "top-right" });
            }
        };

        fetchProject();
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
        
        // console.log(image);
        // console.log(imagePreview);
        
        if (image) {
            formData.append('image', image);
        } else if (imagePreview) {
            formData.append('image', imagePreview);
        }
    
        try {
            await axios.put(`/api/matra/update-home-project/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("project updated successfully", { position: "top-right" });
            navigate("/home-project");
        } catch (error) {
            console.error("Error updating project:", error);
            toast.error("Failed to update project", { position: "top-right" });
        }
    };
    

    return (
        <div className='addProject'>
            <Link to="/home-project" className='back'>Back</Link>
            <h3>Edit project</h3>
            <form className='addProjectForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter project title"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="image">Image</label>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Current project" width="100" />
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
                    <button type="submit">Update project</button>
                </div>
            </form>
        </div>
    );
};

export default EditProject;

