import React, { useEffect, useState } from 'react';
import "./innovation.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Innovation = () => {
    const [innovations, setinnovations] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-innovation");
                // console.log(response);
                setinnovations(response.data); // Use the response directly, no need for `.innovation`
            } catch (error) {
                console.error("Error fetching innovations:", error);
                toast.error("Error fetching innovations", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteinnovation = async (innovationId) => {
        try {
            await axios.delete(`/api/matra/delete-innovation/${innovationId}`);
            setinnovations((previnnovation) => previnnovation.filter((innovation) => innovation.id !== innovationId)); // Use id, assuming innovationId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting innovation:", error);
            toast.error("Error deleting innovation", { position: 'top-right' });
        }
    };

    return (
        <div className='innovationTable'>
            <Link to={"/add-innovation"} className='addButton'>Add whyus Title</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        innovations?.map((innovation, index) => {
                            return (
                                <tr key={innovation.id}> {/* Use innovation.id */}
                                    <td>{index + 1}</td>
                                    <td>{innovation.name}</td>
                                    <td>{innovation.link}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteinnovation(innovation.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-innovation/` + innovation.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Innovation;
