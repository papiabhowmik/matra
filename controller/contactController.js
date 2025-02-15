import db from '../config/db.js';
//GET Single contact
export const getContactController = async (req, res) => {
    try{
        const contact = await db.query("SELECT * FROM contact");
        return res.status(200).send(
            contact[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting contact',
            error
        })
    }
}
export const singleContactController = async (req, res) => {
    try{
        const {id} = req.params;
        const contact = await db.query(`SELECT * FROM contact WHERE id = ?`,[id]);
        if(!contact){
            return res.status(404).send({
                success: false,
                message: 'contact not found',
            });
        }
        return res.status(200).send(
            contact[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single contact',
            error
        })
    }
}
export const updateContactController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, address, phoneno, email} = req.body;
        const contact = await db.query(`UPDATE contact SET  title = ?, address = ?, phoneno = ?, email = ? WHERE id = ?`, [title, address, phoneno, email, id])
        return res.status(200).send({
            success: true,
            message: "contact updated",
            contact,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating contact',
            error
        })
    }
}

