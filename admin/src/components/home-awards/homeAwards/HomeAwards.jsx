import React, { useEffect, useState } from 'react';
import "./homeAwards.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeAward = () => {
    const [homeAwards, setHomeAwards] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/home-awards");
                console.log(response);
                setHomeAwards(response.data); // Use the response directly, no need for `.homeAward`
            } catch (error) {
                console.error("Error fetching homeAwards:", error);
                toast.error("Error fetching homeAwards", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteHomeAward = async (homeAwardId) => {
        try {
            await axios.delete(`/api/matra/delete-home-awards/${homeAwardId}`);
            setHomeAwards((prevHomeAward) => prevHomeAward.filter((homeAward) => homeAward.id !== homeAwardId)); // Use id, assuming homeAwardId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting homeAward:", error);
            toast.error("Error deleting homeAward", { position: 'top-right' });
        }
    };

    return (
        <div className='homeAwardTable'>
            <Link to={"/add-home-awards"} className='addButton'>Add home Award</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        homeAwards?.map((homeAward, index) => {
                            return (
                                <tr key={homeAward.id}> {/* Use homeAward.id */}
                                    <td>{index + 1}</td>
                                    <td>{homeAward.content}</td>
                                    
                                    <td><img src={`http://localhost:8000/upload/${homeAward.image}`} alt={homeAward.image} width="100" /></td> 
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteHomeAward(homeAward.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-home-awards/` + homeAward.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default HomeAward;
