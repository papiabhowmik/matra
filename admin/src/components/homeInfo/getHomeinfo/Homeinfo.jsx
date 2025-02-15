import React, { useEffect, useState } from 'react';
import "./homeinfo.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Homeinfo = () => {
    const [homeinfo, sethomeinfo] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/home-info");
                console.log(response);
                sethomeinfo(response.data); // Use the response directly, no need for `.homeinfo`
            } catch (error) {
                console.error("Error fetching homeinfo:", error);
                toast.error("Error fetching homeinfo", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='homeinfoTable'>
           
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Content</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        homeinfo?.map((homeinfo, index) => {
                            return (
                                <tr key={homeinfo.id}> {/* Use homeinfo.id */}
                                    <td>{index + 1}</td>
                                    <td>{homeinfo.title}</td>
                                    <td><img src={`http://localhost:8000/upload/${homeinfo.image}`} alt={homeinfo.image} width="100" /></td>
                                    <td>{homeinfo.content}</td>
                                    <td>{homeinfo.description}</td>
                                    {/* <td><img src={`/path/to/images/${homeinfo.image}`} alt={homeinfo.image} width="100" /></td> Adjust image rendering */}
                                    <td className='actionButtons'>
                                        <Link to={`/edit-homeinfo/` + homeinfo.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Homeinfo;
