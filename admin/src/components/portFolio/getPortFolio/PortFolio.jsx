import React, { useEffect, useState } from 'react';
import "./portfolio.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PortFolio = () => {
    const [portFolios, setPortFolios] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-portfolio");
                // console.log(response);
                setPortFolios(response.data); // Use the response directly, no need for `.portFolio`
            } catch (error) {
                console.error("Error fetching portFolios:", error);
                toast.error("Error fetching portFolios", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteportFolio = async (portFolioId) => {
        try {
            await axios.delete(`/api/matra/delete-portfolio/${portFolioId}`);
            setPortFolios((prevportFolio) => prevportFolio.filter((portFolio) => portFolio.id !== portFolioId)); // Use id, assuming portFolioId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting portFolio:", error);
            toast.error("Error deleting portFolio", { position: 'top-right' });
        }
    };

    return (
        <div className='portFolioTable'>
            <Link to={"/add-portfolio"} className='addButton'>Add portFolio</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>PortFolio Type</th>
                        <th>Image & Video</th>
                        <th>Big Image</th>
                        <th>Link</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Project Link</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        portFolios?.map((portFolio, index) => {
                            return (
                                <tr key={portFolio.id}> {/* Use portFolio.id */}
                                    <td>{index + 1}</td>
                                    <td>{portFolio.name}</td>
                                    
                                    <td><img src={`http://localhost:8000/upload/${portFolio.image_video}`} alt={portFolio.image_video} width="100" /></td> 
                                    <td><img src={`http://localhost:8000/upload/${portFolio.big_image}`} alt={portFolio.big_image} width="100" /></td> 
                                    <td>{portFolio.link}</td>
                                    <td>{portFolio.title}</td>
                                    <td>{portFolio.description}</td>
                                    <td>{portFolio.project_link}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteportFolio(portFolio.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-portfolio/` + portFolio.id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PortFolio;
