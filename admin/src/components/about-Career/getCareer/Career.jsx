import React, { useEffect, useState } from 'react';
import "./career.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Career = () => {
    const [career, setCareer] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/about-career");
                console.log(response);
                setCareer(response.data); // Use the response directly, no need for `.career`
            } catch (error) {
                console.error("Error fetching career:", error);
                toast.error("Error fetching career", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='careerTable'>
           
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        career?.map((career, index) => {
                            return (
                                <tr key={career.id}> {/* Use career.id */}
                                    <td>{index + 1}</td>
                                    <td>{career.title}</td>
                                    <td><img src={`http://localhost:8000/upload/${career.image}`} alt={career.image} width="100" /></td>
                                    <td>{career.description}</td>
                                    {/* <td><img src={`/path/to/images/${career.image}`} alt={career.image} width="100" /></td> Adjust image rendering */}
                                    <td className='actionButtons'>
                                        <Link to={`/edit-career/` + career.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Career;
