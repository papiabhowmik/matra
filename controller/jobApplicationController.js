import db from "../config/db.js";

export const jobApplicationController = async (req, res) => {
    try{
        const jobApplication = await db.query("SELECT * FROM job_application")
        res.status(200).send(jobApplication[0])
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in jobApplication',
            error,
        })
    }
}


export const addJobApplicationController = async (req, res) => {
    try{
        const {f_name, l_name, email, job_role, address, city, pincode, application_date} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        if(!f_name || !l_name || !email || !job_role || !address || !city || !pincode || !application_date || !image){
            return res.status(400).json({message: 'All fields are required.'});
        }
        const jobApplication = await db.query(`INSERT INTO job_application(f_name, l_name, email, job_role, address, city, pincode, application_date, cv)VALUES(?,?,?,?,?,?,?,?,?)`,[f_name, l_name, email, job_role, address, city, pincode, application_date, image]);
        return res.status(201).json({message: 'Form added successfully'});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}



