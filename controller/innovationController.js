import db from "../config/db.js";

export const getinnovationController = async (req, res) => {
    try{
        const innovation = await db.query("SELECT * FROM innovation")
        res.status(200).send(innovation[0])
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in innovation',
            error,
        })
    }
}


//GET Single Slider
export const getSingleInnovationController = async (req, res) => {
    try{
        const {id} = req.params;
        const innovation = await db.query(`SELECT * FROM innovation WHERE id = ?`,[id]);
        if(!innovation){
            return res.status(404).send({
                success: false,
                message: 'innovation not found',
            });
        }
        return res.status(200).send(
            innovation[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single innovation',
            error
        })
    }
}

export const addInnovationController = async (req, res) => {
    try{
        const {name, link} = req.body;
        
        if(!name){
            return res.status(400).json({message: 'name is required.'});
        }
        if(!link){
            return res.status(400).json({message: 'name is required.'});
        }
        const newInnovation = await db.query(`INSERT INTO innovation (name, link)VALUES( ?, ?)`,[name, link]);
        
        return res.status(201).json({ message: 'innovation added successfully', innovation: newInnovation });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

export const updateInnovationController = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, link} = req.body;
        const innovation = await db.query(`UPDATE innovation SET name = ?, link = ? WHERE id = ?`, [name, link, id])
        return res.status(200).send({
            success: true,
            message: "innovation updated",
            innovation,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating innovation',
            error
        })
    }
}

export const deleteInnovationController = async (req, res) => {
    try{
        const id = req.params.id;
        const innovationExist = await db.query(`SELECT * FROM innovation WHERE id = ?`,[id])
        if(!innovationExist){
            return res.status(404).json({msg: "innovation not exist"});
        }
        await db.query(`DELETE FROM innovation WHERE id = ? `,[id]);
        res.status(200).json({msg: "innovation deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    