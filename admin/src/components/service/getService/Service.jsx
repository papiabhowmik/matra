import React, { useEffect, useState } from 'react';
import "./service.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Service = () => {
    const [services, setServices] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/home-service");
                console.log(response);
                setServices(response.data); // Use the response directly, no need for `.service`
            } catch (error) {
                console.error("Error fetching services:", error);
                toast.error("Error fetching services", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteService = async (serviceId) => {
        try {
            await axios.delete(`/api/matra/delete-home-service/${serviceId}`);
            setServices((prevService) => prevService.filter((service) => service.id !== serviceId)); // Use id, assuming serviceId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error("Error deleting service", { position: 'top-right' });
        }
    };

    return (
        <div className='serviceTable'>
            <Link to={"/add-service"} className='addButton'>Add Service</Link>
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
                        services?.map((service, index) => {
                            return (
                                <tr key={service.id}> {/* Use service.id */}
                                    <td>{index + 1}</td>
                                    <td>{service.title}</td>
                                    <td><img src={`http://localhost:8000/upload/${service.image}`} alt={service.image} width="100" /></td> 
                                    <td>{service.description}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteService(service.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-service/` + service.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Service;
