import React, { useEffect, useState } from 'react';
import "./project.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Project = () => {
    const [projects, setProjects] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/home-project");
                console.log(response);
                setProjects(response.data); // Use the response directly, no need for `.project`
            } catch (error) {
                console.error("Error fetching projects:", error);
                toast.error("Error fetching projects", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`/api/matra/delete-home-project/${projectId}`);
            setProjects((prevProject) => prevProject.filter((project) => project.id !== projectId)); // Use id, assuming projectId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Error deleting project", { position: 'top-right' });
        }
    };

    return (
        <div className='projectTable'>
            <Link to={"/add-project"} className='addButton'>Add project</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects?.map((project, index) => {
                            return (
                                <tr key={project.id}> {/* Use project.id */}
                                    <td>{index + 1}</td>
                                    <td>{project.title}</td>
                                    
                                    <td><img src={`http://localhost:8000/upload/${project.image}`} alt={project.image} width="100" /></td> 
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteProject(project.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-project/` + project.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Project;
