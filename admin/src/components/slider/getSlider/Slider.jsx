import React, { useEffect, useState } from 'react';
import "./slider.css";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Slider = () => {
    const [sliders, setSliders] = useState([]); // Set as array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/matra/home-slider");
                console.log(response);
                setSliders(response.data); // Use the response directly, no need for `.slider`
            } catch (error) {
                console.error("Error fetching sliders:", error);
                toast.error("Error fetching sliders", { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    const deleteSlider = async (sliderId) => {
        try {
            await axios.delete(`/api/matra/delete-home-slider/${sliderId}`);
            setSliders((prevSlider) => prevSlider.filter((slider) => slider.id !== sliderId)); // Use id, assuming sliderId is from API response
            toast.success("Deleted successfully", { position: 'top-right' });
        } catch (error) {
            console.error("Error deleting slider:", error);
            toast.error("Error deleting slider", { position: 'top-right' });
        }
    };

    return (
        <div className='sliderTable'>
            <Link to={"/add_slider"} className='addButton'>Add Slider</Link>
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
                        sliders?.map((slider, index) => {
                            return (
                                <tr key={slider.id}> {/* Use slider.id */}
                                    <td>{index + 1}</td>
                                    <td>{slider.title}</td>
                                    
                                    <td><img src={`http://localhost:8000/upload/${slider.image}`} alt={slider.image} width="100" /></td> 
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteSlider(slider.id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit_slider/` + slider.id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Slider;
