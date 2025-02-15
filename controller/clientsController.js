import db from "../config/db.js";

export const homeClientsController = async (req, res) => {
    try{
        const clients = await db.query("SELECT * FROM home_clients")
        res.status(200).send(clients[0])
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in clients',
            error,
        })
    }
}


//GET Single Slider
export const getSingleClientsController = async (req, res) => {
    try{
        const {id} = req.params;
        const clients = await db.query(`SELECT * FROM home_clients WHERE id = ?`,[id]);
        if(!clients){
            return res.status(404).send({
                success: false,
                message: 'clients not found',
            });
        }
        return res.status(200).send(
            clients[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single clients',
            error
        })
    }
}

export const addHomeClientsController = async (req, res) => {
    try{
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        
        if(!image){
            return res.status(400).json({message: 'Image is required.'});
        }
        const newClients = await db.query(`INSERT INTO home_clients (image)VALUES( ?)`,[image]);
        
        return res.status(201).json({ message: 'Clients added successfully', clients: newClients });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

export const updateHomeClientsController = async (req, res) => {
    try{
        const {id} = req.params;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        const clients = await db.query(`UPDATE home_clients SET image = ? WHERE id = ?`, [image, id])
        return res.status(200).send({
            success: true,
            message: "clients updated",
            clients,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating clients',
            error
        })
    }
}

export const deleteHomeClientsController = async (req, res) => {
    try{
        const id = req.params.id;
        const clientsExist = await db.query(`SELECT * FROM home_clients WHERE id = ?`,[id])
        if(!clientsExist){
            return res.status(404).json({msg: "clients not exist"});
        }
        await db.query(`DELETE FROM home_clients WHERE id = ? `,[id]);
        res.status(200).json({msg: "clients deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    