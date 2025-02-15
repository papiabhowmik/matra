import React, { useEffect, useState } from 'react';
import "./jobApplication.css";
import toast from 'react-hot-toast';
import axios from 'axios';

const JobApplication = () => {
    const [jobApplication, setjobApplication] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/job-application");
                console.log(response);
                setjobApplication(response.data); // Use the response directly, no need for `.jobApplication`
            } catch (error) {
                console.error("Error fetching jobApplication:", error);
                toast.error("Error fetching jobApplication", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='jobApplicationTable'>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>first Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Job Role</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pin Code</th>
                        <th>Application Date</th>
                        <th>CV</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        jobApplication?.map((jobApplication, index) => {
                            return (
                                <tr key={jobApplication.id}> {/* Use jobApplication.id */}
                                    <td>{index + 1}</td>
                                    <td>{jobApplication.f_name}</td>
                                    <td>{jobApplication.l_name}</td>
                                    <td>{jobApplication.email}</td>
                                    <td>{jobApplication.job_role}</td>
                                    <td>{jobApplication.address}</td>
                                    <td>{jobApplication.city}</td>
                                    <td>{jobApplication.pincode}</td>
                                    <td>{jobApplication.application_date}</td>
                                    {/* <td>{jobApplication.cv}</td>  */}
                                    <td>
                                        <a href={`http://localhost:8000/upload/${jobApplication.cv}`} download>
                                        <i class="fa-solid fa-file-pdf" style={{fontSize:'30px', color:'red'}}></i>
                                        </a>
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

export default JobApplication;
