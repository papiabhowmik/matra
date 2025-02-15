import db from '../config/db.js';

export const homeServiceController = async (req, res) => {
    try{
        const service = await db.query("SELECT * FROM home_service")
        res.status(200).send(service[0])
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in service',
            error,
        })
    }
}


//GET Single Slider
export const getSingleServiceController = async (req, res) => {
    try{
        const {id} = req.params;
        const service = await db.query(`SELECT * FROM home_service WHERE id = ?`,[id]);
        if(!service){
            return res.status(404).send({
                success: false,
                message: 'service not found',
            });
        }
        return res.status(200).send(service[0]);
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single service',
            error
        })
    }
}

export const addHomeServiceController = async (req, res) => {
    try{
        const {title, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        
        if(!title){
            return res.status(400).json({message: 'Title is required.'});
        }
        if(!image){
            return res.status(400).json({message: 'Image is required.'});
        }
        if(!description){
            return res.status(400).json({message: 'Description is required.'});
        }
        const newservice = await db.query(`INSERT INTO home_service (title, image, description)VALUES(?, ?, ?)`,[title, image, description]);
        
        return res.status(201).json({ message: 'service added successfully', service: newservice });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

export const updateHomeServiceController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let service;
        if(image == null){
            const result = await db.query(`UPDATE home_service SET title =?, description = ? WHERE id = ?`, [title, description, id])
            service = result[0];
        }
        else{
            const result = await db.query(`UPDATE home_service SET title =?, image = ?, description = ? WHERE id = ?`, [title, image, description, id])
            service = result[0];
        }
        return res.status(200).send({
            success: true,
            message: "service updated",
            service,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating service',
            error
        })
    }
}

export const deleteHomeServiceController = async (req, res) => {
    try{
        const id = req.params.id;
        const serviceExist = await db.query(`SELECT * FROM home_service WHERE id = ?`,[id])
        if(!serviceExist){
            return res.status(404).json({msg: "service not exist"});
        }
        await db.query(`DELETE FROM home_service WHERE id = ? `,[id]);
        res.status(200).json({msg: "service deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}




//------------------------------- service page -----------------------------


export const serviceController = async (req, res) => {
    try{
        const service = await db.query("SELECT * FROM service")
        res.status(200).send(service[0])
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in service',
            error,
        })
    }
}


//GET Single Service
export const getSingleServicePageController = async (req, res) => {
    try{
        const {id} = req.params;
        const service = await db.query(`SELECT * FROM service WHERE id = ?`,[id]);
        if(!service){
            return res.status(404).send({
                success: false,
                message: 'service not found',
            });
        }
        return res.status(200).send(service[0]);
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single service',
            error
        })
    }
}

export const addServiceController = async (req, res) => {
    try{
        const {name, info1, info2, info3, info4, info5, info6} = req.body;
        
        if(!name){
            return res.status(400).json({message: 'Name is required.'});
        }
        const newservice = await db.query(`INSERT INTO service (name, info1, info2, info3, info4, info5, info6)VALUES(?, ?, ?, ?, ?, ?, ?)`,[name, info1, info2, info3, info4, info5, info6]);
        
        return res.status(201).json({ message: 'service added successfully', service: newservice });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

export const updateServiceController = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, info1, info2, info3, info4, info5, info6} = req.body;
        const service = await db.query(`UPDATE service SET name =?, info1 = ?, info2 = ?, info3 = ?, info4 = ?, info5 = ?, info6 = ? WHERE id = ?`, [name, info1, info2, info3, info4, info5, info6, id])
        return res.status(200).send({
            success: true,
            message: "service updated",
            service,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating service',
            error
        })
    }
}

export const deleteServiceController = async (req, res) => {
    try{
        const id = req.params.id;
        const serviceExist = await db.query(`SELECT * FROM service WHERE id = ?`,[id])
        if(!serviceExist){
            return res.status(404).json({msg: "service not exist"});
        }
        await db.query(`DELETE FROM service WHERE id = ? `,[id]);
        res.status(200).json({msg: "service deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    

