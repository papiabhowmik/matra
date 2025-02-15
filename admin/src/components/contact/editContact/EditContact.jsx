import React, { useEffect, useState } from 'react';
import "./editContact.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditContact = () => {
    const [title, settitle] = useState('');
    const [address, setaddress] = useState('');
    const [phoneno, setphoneno] = useState('');
    const [email, setemail] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`/api/matra/get-single-contact/${id}`);
                // console.log(response.data[0].title);
                // console.log(response.data[0].description);
                settitle(response.data[0].title);
                setaddress(response.data[0].address);
                setphoneno(response.data[0].phoneno);
                setemail(response.data[0].email);
             
                
            } catch (error) {
                console.error("Error fetching the slider:", error);
                toast.error("Failed to load slider data", { position: "top-right" });
            }
        };

        fetchContact();
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        if(!title.trim() || !address.trim() || !phoneno.trim() || !email.trim()){
            toast.error("All fields are required", { position: "top-right" });
            return;
        }
 
        await axios.put(`/api/matra/update-contact/${id}`, {title,address,phoneno,email})
        .then((response) =>{
            toast.success("Update successfully",{position:"top-right"})
            navigate("/contact");
        }).catch(error => console.log(error));
    };
    

    return (
        <div className='addContact'>
            <Link to="/contact" className='back'>Back</Link>
            <h3>Edit Contact</h3>
            <form className='addContactForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        placeholder="Enter title"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="address">address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        placeholder="Enter address"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="phoneno">phoneno</label>
                    <input
                        type="text"
                        id="phoneno"
                        name="phoneno"
                        value={phoneno}
                        onChange={(e) => setphoneno(e.target.value)}
                        placeholder="Enter phoneno"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="email">email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <button type="submit">Update Contact</button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;

