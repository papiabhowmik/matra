import React, { useEffect, useState } from 'react';
import "./whyusContent.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WhyusContent = () => {
    const [whyusContents, setWhyusContents] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-whyus");
                console.log(response);
                setWhyusContents(response.data); // Use the response directly, no need for `.whyusContent`
            } catch (error) {
                console.error("Error fetching whyusContents:", error);
                toast.error("Error fetching whyusContents", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteWhyusContent = async (whyusContentId) => {
        try {
            await axios.delete(`/api/matra/delete-whyus/${whyusContentId}`);
            setWhyusContents((prevwhyusContent) => prevwhyusContent.filter((whyusContent) => whyusContent.id !== whyusContentId)); // Use id, assuming whyusContentId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting whyusContent:", error);
            toast.error("Error deleting whyusContent", { position: 'top-right' });
        }
    };

    return (
        <div className='whyusContentTable'>
            <Link to={"/add-whyus"} className='addButton'>Add Whyus</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Title</th>
                        <th>Logo</th>
                        <th>Content</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        whyusContents?.map((whyusContent, index) => {
                            return (
                                <tr key={whyusContent.id}> {/* Use whyusContent.id */}
                                    <td>{index + 1}</td>
                                    <td>{whyusContent.title}</td>
                                    <td><img src={`http://localhost:8000/upload/${whyusContent.logo}`} alt={whyusContent.logo} width="100" /></td> 
                                    <td>{whyusContent.content}</td>
                                    <td>{whyusContent.description}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteWhyusContent(whyusContent.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-whyus/` + whyusContent.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default WhyusContent;
