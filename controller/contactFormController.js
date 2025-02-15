import db from '../config/db.js';

export const getContactFormController = async (req, res) => {
    try{
        const contact = await db.query("SELECT * FROM contact_form");
        return res.status(200).send(contact[0],);
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while getting title',
            error,
        })
    }
} 

export const addContactFormController = async (req, res) => {
    try{
        const {name, phone, email, message} = req.body;
        if(!name || !phone || !email || !message){
            return res.status(400).json({message: 'All fields are required.'});
        }
        const contactForm = await db.query(`INSERT INTO contact_form(name, phone, email, message)VALUES(?,?,?,?)`,[name, phone, email, message]);
        return res.status(201).json({message: 'Form added successfully'});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}