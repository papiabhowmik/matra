import React, { useEffect, useState } from 'react';
import "./allTitle.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllTitle = () => {
    const [allTitle, setallTitle] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-all-title");
                console.log(response);
                setallTitle(response.data); // Use the response directly, no need for `.allTitle`
            } catch (error) {
                console.error("Error fetching allTitle:", error);
                toast.error("Error fetching allTitle", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='allTitleTable'>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Home Service Title</th>
                        <th>Home Project Title</th>
                        <th>Home Awards Title</th>
                        <th>About Awards Title</th>
                        <th>Why us Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTitle?.map((allTitle, index) => {
                            return (
                                <tr key={allTitle.id}> {/* Use allTitle.id */}
                                    <td>{index + 1}</td>
                                    <td>{allTitle.home_service_title}</td>
                                    <td>{allTitle.home_project_title}</td>
                                    <td>{allTitle.home_awards_title}</td>
                                    <td>{allTitle.about_awards_title}</td>
                                    <td>{allTitle.whyus_title}</td>
                                    <td className='actionButtons'>
                                        <Link to={`/edit-all-title/` + allTitle.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default AllTitle;
