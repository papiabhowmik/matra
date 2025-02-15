import React, { useEffect, useState } from 'react';
import "./contactForm.css";
import toast from 'react-hot-toast';
import axios from 'axios';

const ContactForm = () => {
    const [contactForm, setcontactForm] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-contact-form");
                console.log(response);
                setcontactForm(response.data); // Use the response directly, no need for `.contactForm`
            } catch (error) {
                console.error("Error fetching contactForm:", error);
                toast.error("Error fetching contactForm", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='contactFormTable'>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Phone No</th>
                        <th>Email</th>
                        <th>Message</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        contactForm?.map((contactForm, index) => {
                            return (
                                <tr key={contactForm.id}> {/* Use contactForm.id */}
                                    <td>{index + 1}</td>
                                    <td>{contactForm.name}</td>
                                    <td>{contactForm.phone}</td>
                                    <td>{contactForm.email}</td>
                                    <td>{contactForm.message}</td>
                                    
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ContactForm;
