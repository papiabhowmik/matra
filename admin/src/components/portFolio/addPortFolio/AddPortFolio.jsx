import React, { useState, useEffect} from 'react';
import "./addPortFolio.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddPortfolio = () => {
    const [portfolio_id,setPortfolio_id] = useState('');
    const [image,setImage] = useState('');
    const [big_image,setBigImage] = useState('');
    const [project_link,setProject_link] = useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [link,setLink] = useState('');
    const [portfolio_name,setPortfolio_name] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await axios.get('/api/matra/get-portfolio-category');
                setPortfolio_name(response.data); // Assuming the response contains the titles as an array
            } catch (error) {
                console.error('Error fetching titles:', error);
            }
        };
        fetchTitles();
    }, []);

    const submitForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('portfolio_id',portfolio_id);
        formData.append('image',image);
        formData.append('big_image', big_image);
        formData.append('project_link',project_link);
        formData.append('title',title);
        formData.append('description',description);
        formData.append('link',link);
        try{
             await axios.post("/api/matra/add-portfolio", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            toast.success("Add successfully",{position:"top-right"})
            navigate("/portfolio");
        }catch(error){
            console.log(error);
            console.error(error.response.data.message);
            toast.error(error.response.data.message , { position: "top-right" });
        }
        
    };
    return (
        <div className='addPortfolio'>
            <Link to={"/portfolio"} className='back'>Back</Link>
            <h3>Add new Portfolio</h3>
            <form className='addPortfolioForm' onSubmit={submitForm}>
            <div className="inputGroup">
            <label htmlFor="portfolio_id">portfolio_id</label>
            <select
                id='portfolio_id'
                name='portfolio_id'
                value={portfolio_id}
                onChange={(e) => setPortfolio_id(e.target.value)}
            >
                <option value="">Select a Portfolio</option>
                {portfolio_name.map((p_name) => (
                    <option key={p_name.id} value={p_name.id}>
                        {p_name.name} {/* Adjust to match the key in your response */}
                    </option>
                ))}
            </select>
        </div>

        {/* Conditionally render based on portfolio_id selection */}
        {portfolio_id === "1" ? (
            <>
                <div className="inputGroup">
                    <label htmlFor="image">image & video</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        id='image'
                        name='image'
                        autoComplete='off'
                        placeholder='image'
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="big_image">Big Image</label>
                    <input
                        type="file"
                        onChange={(e) => setBigImage(e.target.files[0])}
                        id='big_image'
                        name='big_image'
                        autoComplete='off'
                        placeholder='big_image'
                    />
                </div>
            </>
        ) : (
            <div className="inputGroup">
                <label htmlFor="link">link</label>
                <input
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                    id='link'
                    name='link'
                    autoComplete='off'
                    placeholder='link'
                />
            </div>
        )}
                <div className="inputGroup">
                    <label htmlFor="title">title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} id='title' name='title' autoComplete='off' placeholder='title' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="description">description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} id='description' name='description' autoComplete='off' placeholder='description' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="project_link">Project link</label>
                    <input type="text" onChange={(e) => setProject_link(e.target.value)} id='project_link' name='project_link' autoComplete='off' placeholder='project_link' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add Portfolio</button>
                </div>
            </form>
        </div>
    )
}

export default AddPortfolio;
