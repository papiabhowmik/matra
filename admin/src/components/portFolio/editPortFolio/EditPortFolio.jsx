import React, { useEffect, useState } from 'react';
import "../addPortFolio/addPortFolio.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditPortfolio = () => {
    const [portfolio_id, setportfolio_id] = useState('');
    const [image, setImage] = useState('');
    const [bigImage, setBigImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [bigImagePreview, setBigImagePreview] = useState(null);
    const [portfolio_name, setPortfolio_name] = useState([]);
    const [project_link, setproject_link] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await axios.get('/api/matra/get-portfolio-category');
                setPortfolio_name(response.data); // Assuming the response contains the titles as an array
                // setp_id(r)
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching titles:', error);
            }
        };
        fetchTitles();
    }, []);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`/api/matra/get-single-Portfolio/${id}`);
                setportfolio_id(response.data[0].portfolio_id); // Set the portfolio_id fetched from the API
                // console.log(response.data[0].portfolio_id);
                setTitle(response.data[0].title);
                setDescription(response.data[0].description);
                setLink(response.data[0].link);
                setImagePreview(`/upload/${response.data[0].image_video}`);
                setBigImagePreview(`/upload/${response.data[0].big_image}`);
            } catch (error) {
                console.error("Error fetching the Portfolio:", error);
                toast.error("Failed to load Portfolio data", { position: "top-right" });
            }
        };
        fetchPortfolio();
    }, [id]);

    const changeData = (e) => {
        setportfolio_id(e.target.value);
        // console.log(e.target.value);
    }
    const changeImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const changeBigImage = (e) => {
        const file = e.target.files[0];
        setBigImage(file);
        setBigImagePreview(URL.createObjectURL(file));
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('portfolio_id', portfolio_id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        formData.append('project_link', project_link);

        if (image) {
            formData.append('image', image);
        }
        if (bigImage) {
            formData.append('big_image', bigImage);
        }

        try {
            await axios.put(`/api/matra/update-Portfolio/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Portfolio updated successfully", { position: "top-right" });
            navigate("/portfolio");
        } catch (error) {
            console.error("Error updating Portfolio:", error);
            toast.error("Failed to update Portfolio", { position: "top-right" });
        }
    };

    return (
        <div className='addPortfolio'>
            <Link to="/portfolio" className='back'>Back</Link>
            <h3>Edit Portfolio</h3>
            <form className='addPortfolioForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="portfolio_id">Portfolio Type</label>
                    <select
                        id="portfolio_id"
                        name="portfolio_id"
                        value={portfolio_id}
                        onChange={(e) => changeData(e)}
                        required
                    >
                        <option value="">Select a title</option>
                        {portfolio_name.map((p_name) => (
                            <option key={p_name.id} value={p_name.id}>
                                {p_name.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ensure the portfolio_id section renders as soon as portfolio_id is set */}
                {portfolio_id === "1" && (
                    <>
                        <div className="inputGroup">
                            <label htmlFor="image">Image</label>
                            {imagePreview && (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Current Portfolio" width="100" />
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
                            <label htmlFor="big_image">Big Image</label>
                            {bigImagePreview && (
                                <div className="image-preview">
                                    <img src={bigImagePreview} alt="Big Image" width="100" />
                                </div>
                            )}
                            <input
                                type="file"
                                id="big_image"
                                name="big_image"
                                onChange={changeBigImage}
                            />
                        </div>
                    </>
                )}

                {/* If portfolio_id is not 1, show the link field */}
                {portfolio_id !== "1" && (
                    <div className="inputGroup">
                        <label htmlFor="link">Link</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter Portfolio link"
                        />
                    </div>
                )}

                <div className="inputGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Portfolio title"
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
                        placeholder="Enter Portfolio description"
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="project_link">Project Link</label>
                    <input
                        type="text"
                        id="project_link"
                        name="project_link"
                        value={project_link}
                        onChange={(e) => setproject_link(e.target.value)}
                        placeholder="Enter Portfolio project_link"
                    />
                </div>

                <div className="inputGroup">
                    <button type="submit">Update Portfolio</button>
                </div>
            </form>
        </div>
    );
};

export default EditPortfolio;
