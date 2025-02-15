import React, { useState, useEffect} from 'react';
import "./addWhyusContent.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddWhyusContent = () => {
    const [title_id,setTitle_id] = useState('');
    const [image,setImage] = useState('');
    const [content,setContent] = useState('');
    const [description,setDescription] = useState('');
    const [titles, setTitles] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await axios.get('/api/matra/get-whyus-title');
                setTitles(response.data); // Assuming the response contains the titles as an array
            } catch (error) {
                console.error('Error fetching titles:', error);
            }
        };
        fetchTitles();
    }, []);
    const submitForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title_id',title_id);
        formData.append('image',image);
        formData.append('content',content);
        formData.append('description',description);
        try{
             await axios.post("/api/matra/add-whyus", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            toast.success("Add successfully",{position:"top-right"})
            navigate("/whyus");
        }catch(error){
            
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
        
    };
    return (
        <div className='addWhyusContent'>
            <Link to={"/whyus"} className='back'>Back</Link>
            <h3>Add new WhyusContent</h3>
            <form className='addWhyusContentForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title_id">Title</label>
                    <select
                        id='title_id'
                        name='title_id'
                        value={title_id}
                        onChange={(e) => setTitle_id(e.target.value)}
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
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} id='image' name='image' autoComplete='off' placeholder='image' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="content">Content</label>
                    <input type="text" onChange={(e) => setContent(e.target.value)} id='content' name='content' autoComplete='off' placeholder='content' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} id='description' name='description' autoComplete='off' placeholder='description' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add WhyusContent</button>
                </div>
            </form>
        </div>
    )
}

export default AddWhyusContent;
