import React, { useEffect, useState } from 'react';
import "../addClient/addClient.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditClient = () => {
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { id } = useParams(); 
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`/api/matra/home-single-clients/${id}`);
                setImage(response.data[0].image);
                console.log(response.data[0].image);
                setImagePreview(`/upload/${response.data[0].image}`);
                console.log(`/upload/${response.data[0].image}`);
            
            } catch (error) {
                console.error("Error fetching the client:", error);
                toast.error("Failed to load client data", { position: "top-right" });
            }
        };

        fetchClient();
    }, [id]); 

    const changeImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const submitForm = async (e) => {
        e.preventDefault(); 
        
        const formData = new FormData();
        // formData.append('image', image);

        if (image) {
           
            formData.append('image', image);
        } else if (imagePreview) {
         
            formData.append('image', imagePreview);
        }

        try {
            await axios.put(`/api/matra/update-home-clients/${id}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }); 
            toast.success("client updated successfully", { position: "top-right" });
            navigate("/home-client"); // Navigate back to the client list page
        } catch (error) {
            console.error("Error updating client:", error);
            toast.error("Failed to update client", { position: "top-right" });
        }
    };

    return (
        <div className='addClient'>
            <Link to="/home-client" className='back'>Back</Link>
            <h3>Edit Client</h3>
            <form className='addClientForm' onSubmit={submitForm}>
                
                <div className="inputGroup">
                    <label htmlFor="image">Image</label>
                    {imagePreview && (
                        <div className="image-preview">
                        <img src={imagePreview} alt="Current Clients" width="100" />
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
                    <button type="submit">Update Client</button>
                </div>
            </form>
        </div>
    );
};

export default EditClient;
