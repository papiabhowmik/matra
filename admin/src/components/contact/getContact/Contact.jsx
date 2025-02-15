import React, { useEffect, useState } from 'react';
import "./contact.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
    const [contact, setcontact] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-contact");
                console.log(response);
                setcontact(response.data); // Use the response directly, no need for `.contact`
            } catch (error) {
                console.error("Error fetching contact:", error);
                toast.error("Error fetching contact", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='contactTable'>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Phone No</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contact?.map((contact, index) => {
                            return (
                                <tr key={contact.id}> {/* Use contact.id */}
                                    <td>{index + 1}</td>
                                    <td>{contact.title}</td>
                                    <td>{contact.address}</td>
                                    <td>{contact.phoneno}</td>
                                    <td>{contact.email}</td>
                                    
                                    <td className='actionButtons'>
                                        <Link to={`/edit-contact/` + contact.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Contact;
