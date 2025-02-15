import React, { useEffect, useState } from 'react';
import "./mainService.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainService = () => {
    const [mainService, setmainService] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-service");
                console.log(response);
                setmainService(response.data); // Use the response directly, no need for `.mainService`
            } catch (error) {
                console.error("Error fetching mainService:", error);
                toast.error("Error fetching mainService", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteService = async (serviceId) => {
        try {
            await axios.delete(`/api/matra/delete-service/${serviceId}`);
            setmainService((prevService) => prevService.filter((service) => service.id !== serviceId)); // Use id, assuming serviceId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error("Error deleting service", { position: 'top-right' });
        }
    };

    return (
        <div className='mainServiceTable'>
           <Link to={"/add-main-service"} className='addButton'>Add Service</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Info1</th>
                        <th>Info2</th>
                        <th>Info3</th>
                        <th>Info4</th>
                        <th>Info5</th>
                        <th>Info6</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mainService?.map((mainService, index) => {
                            return (
                                <tr key={mainService.id}> {/* Use mainService.id */}
                                    <td>{index + 1}</td>
                                    <td>{mainService.name}</td>
                                    <td>{mainService.info1}</td>
                                    <td>{mainService.info2}</td>
                                    <td>{mainService.info3}</td>
                                    <td>{mainService.info4}</td>
                                    <td>{mainService.info4}</td>
                                    <td>{mainService.info6}</td>
                                    {/* <td><img src={`/path/to/images/${mainService.image}`} alt={mainService.image} width="100" /></td> Adjust image rendering */}
                                    <td className='actionButtons'>
                                    <button onClick={() => deleteService(mainService.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-main-service/` + mainService.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default MainService;
