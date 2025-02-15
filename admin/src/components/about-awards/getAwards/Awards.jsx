import React, { useEffect, useState } from 'react';
import "./awards.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Awards = () => {
    const [awards, setAwards] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/about-awards");
                console.log(response);
                setAwards(response.data); // Use the response directly, no need for `.award`
            } catch (error) {
                console.error("Error fetching awards:", error);
                toast.error("Error fetching awards", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteAward = async (awardId) => {
        try {
            await axios.delete(`/api/matra/delete-about-awards/${awardId}`);
            setAwards((prevAward) => prevAward.filter((award) => award.id !== awardId)); // Use id, assuming awardId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting award:", error);
            toast.error("Error deleting award", { position: 'top-right' });
        }
    };

    return (
        <div className='awardTable'>
            <Link to={"/add-about-awards"} className='addButton'>Add Awards</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Image</th>
                        <th>Year</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        awards?.map((award, index) => {
                            return (
                                <tr key={award.id}> {/* Use award.id */}
                                    <td>{index + 1}</td>
                                    <td><img src={`http://localhost:8000/upload/${award.image}`} alt={award.image} width="100" /></td> 
                                    <td>{award.year}</td>
                                    <td>{award.title}</td>
                                    <td>{award.description}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteAward(award.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-about-awards/` + award.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Awards;
