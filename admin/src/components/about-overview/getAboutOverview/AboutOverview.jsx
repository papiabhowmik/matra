import React, { useEffect, useState } from 'react';
import "./aboutOverview.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AboutOverview = () => {
    const [overviews, setOverviews] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/about-overview");
                console.log(response);
                setOverviews(response.data); // Use the response directly, no need for `.overview`
            } catch (error) {
                console.error("Error fetching overviews:", error);
                toast.error("Error fetching overviews", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='overviewTable'>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        overviews?.map((overview, index) => {
                            return (
                                <tr key={overview.id}> {/* Use overview.id */}
                                    <td>{index + 1}</td>
                                    <td>{overview.title}</td>
                                    <td>{overview.description}</td>
                                    <td className='actionButtons'>
                                        <Link to={`/edit-overview/` + overview.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default AboutOverview;
