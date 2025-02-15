import React, { useEffect, useState } from 'react';
import "./editAllTitle.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditAllTitle = () => {
    const [home_service_title, sethome_service_title] = useState('');
    const [home_project_title, sethome_project_title] = useState('');
    const [home_awards_title, sethome_awards_title] = useState('');
    const [about_awards_title, setabout_awards_title] = useState('');
    const [whyus_title, setwhyus_title] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllTitle = async () => {
            try {
                const response = await axios.get(`/api/matra/get-all-single-title/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].description);
                sethome_service_title(response.data[0].home_service_title);
                sethome_project_title(response.data[0].home_project_title);
                sethome_awards_title(response.data[0].home_awards_title);
                setabout_awards_title(response.data[0].about_awards_title);
                setwhyus_title(response.data[0].whyus_title);
                
            } catch (error) {
                console.error("Error fetching the slider:", error);
                toast.error("Failed to load slider data", { position: "top-right" });
            }
        };

        fetchAllTitle();
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        if(!home_service_title.trim() || !home_project_title.trim() || !home_awards_title.trim() || !about_awards_title.trim() || !whyus_title.trim()){
            toast.error("All fields are required", { position: "top-right" });
            return;
        }
 
        await axios.put(`/api/matra/update-all-title/${id}`, {home_service_title,home_project_title,home_awards_title,about_awards_title,whyus_title})
        .then((response) =>{
            toast.success("Update successfully",{position:"top-right"})
            navigate("/all-title");
        }).catch(error => console.log(error));
    };
    

    return (
        <div className='addAllTitle'>
            <Link to="/all-title" className='back'>Back</Link>
            <h3>Edit AllTitle</h3>
            <form className='addAllTitleForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="home_service_title">home_service_title</label>
                    <input
                        type="text"
                        id="home_service_title"
                        name="home_service_title"
                        value={home_service_title}
                        onChange={(e) => sethome_service_title(e.target.value)}
                        placeholder="Enter home_service_title"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="home_project_title">home_project_title</label>
                    <input
                        type="text"
                        id="home_project_title"
                        name="home_project_title"
                        value={home_project_title}
                        onChange={(e) => sethome_project_title(e.target.value)}
                        placeholder="Enter home_project_title"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="home_awards_title">home_awards_title</label>
                    <input
                        type="text"
                        id="home_awards_title"
                        name="home_awards_title"
                        value={home_awards_title}
                        onChange={(e) => sethome_awards_title(e.target.value)}
                        placeholder="Enter home_awards_title"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="about_awards_title">about_awards_title</label>
                    <input
                        type="text"
                        id="about_awards_title"
                        name="about_awards_title"
                        value={about_awards_title}
                        onChange={(e) => setabout_awards_title(e.target.value)}
                        placeholder="Enter about_awards_title"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="whyus_title">whyus_title</label>
                    <input
                        type="text"
                        id="whyus_title"
                        name="whyus_title"
                        value={whyus_title}
                        onChange={(e) => setwhyus_title(e.target.value)}
                        placeholder="Enter whyus_title"
                        required
                    />
                </div>


                <div className="inputGroup">
                    <button type="submit">Update AllTitle</button>
                </div>
            </form>
        </div>
    );
};

export default EditAllTitle;

