import React, { useEffect, useState } from 'react';
import "./client.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Client = () => {
    const [clients, setClients] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/home-clients");
                console.log(response);
                setClients(response.data); // Use the response directly, no need for `.client`
            } catch (error) {
                console.error("Error fetching clients:", error);
                toast.error("Error fetching clients", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteClient = async (clientId) => {
        try {
            await axios.delete(`/api/matra/delete-home-clients/${clientId}`);
            setClients((prevClient) => prevClient.filter((client) => client.id !== clientId)); // Use id, assuming clientId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting client:", error);
            toast.error("Error deleting client", { position: 'top-right' });
        }
    };

    return (
        <div className='clientTable'>
            <Link to={"/add_client"} className='addButton'>Add client</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients?.map((client, index) => {
                            return (
                                <tr key={client.id}> {/* Use client.id */}
                                    <td>{index + 1}</td>
                                    
                                    
                                    <td><img src={`http://localhost:8000/upload/${client.image}`} alt={client.image} width="100" /></td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteClient(client.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit_client/` + client.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Client;
