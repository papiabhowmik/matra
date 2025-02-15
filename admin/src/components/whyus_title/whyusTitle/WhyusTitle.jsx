import React, { useEffect, useState } from 'react';
import "./whyusTitle.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WhyusTitle = () => {
    const [whyusTitles, setWhyusTitles] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/get-whyus-title");
                console.log(response);
                setWhyusTitles(response.data); // Use the response directly, no need for `.whyusTitle`
            } catch (error) {
                console.error("Error fetching whyusTitles:", error);
                toast.error("Error fetching whyusTitles", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteWhyusTitle = async (whyusTitleId) => {
        try {
            await axios.delete(`/api/matra/delete-whyus-title/${whyusTitleId}`);
            setWhyusTitles((prevwhyusTitle) => prevwhyusTitle.filter((whyusTitle) => whyusTitle.id !== whyusTitleId)); // Use id, assuming whyusTitleId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting whyusTitle:", error);
            toast.error("Error deleting whyusTitle", { position: 'top-right' });
        }
    };

    return (
        <div className='whyusTitleTable'>
            <Link to={"/add-whyus-title"} className='addButton'>Add whyus Title</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        whyusTitles?.map((whyusTitle, index) => {
                            return (
                                <tr key={whyusTitle.id}> {/* Use whyusTitle.id */}
                                    <td>{index + 1}</td>
                                    <td>{whyusTitle.title}</td>
                                    
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteWhyusTitle(whyusTitle.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit-whyus-title/` + whyusTitle.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default WhyusTitle;
