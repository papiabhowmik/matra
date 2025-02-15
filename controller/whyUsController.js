import db from '../config/db.js';
export const getwhyusTitleController = async (req, res) => {
    try{
        const whyus = await db.query("SELECT * FROM why_us1");
        res.status(200).send(
            whyus[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in why us title',
            error,
        })
    }
}
export const singlegetwhyusTitleController = async(req, res) => {
    try{
        const {id} = req.params;
        const whyus = await db.query(`SELECT * FROM why_us1 WHERE id = ? `,[id]);
        res.status(200).send(
            whyus[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in why us title',
            error,
        })
    }
}
export const addwhyusTitleController = async(req, res) => {
    try{
        const {title} = req.body;
        const whyus = await db.query(`INSERT INTO why_us1(title) VALUES (?)`,[title]);
        res.status(200).send({ message: "title added successfully", title: whyus})

    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in why us title',
            error,
        })
    }
}
export const updatewhyusTitleController = async(req, res) => {
    try{
        const {id} = req.params;
        const {title} = req.body;
        const whyus = await db.query(`UPDATE why_us1 SET title = ? WHERE id = ?`,[title, id]);
        return res.status(200).send({
            success: true,
            message: "Updated successfully",
            whyus,
        })
        
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in why us title',
            error,
        })
    }
}
export const deletewhyusTitleController = async(req, res) => {
    try{
        const {id} = req.params;
        const whyus = await db.query(`DELETE FROM why_us1 WHERE id = ? `, [id]);
        res.status(200).send({message: "Delete successfully"});
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in why us title',
            error,
        })
    }
}

// why us main content

export const getwhyusController = async(req, res) => {
    try{
        const whyus = await db.query("SELECT w2.*, w1.title FROM why_us2 w2 LEFT JOIN why_us1 w1 ON w1.id=w2.title_id");
        res.status(200).json(whyus[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server Error', error});
    }
}

export const getSingewhyusController = async(req, res) => {
    try{
        const {id} = req.params;
        const whyus = await db.query(`SELECT * FROM why_us2 WHERE id =?`,[id]);
        res.status(200).json(whyus[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server Error', error});
    }
}

export const addwhyusController = async(req, res) => {
    try{
        const {title_id, content, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        if(!title_id || !image || !content || !description){
            return res.status(400).json({message: 'all field are required.'});
        }
        const whyus = await db.query(`insert INTO why_us2 (title_id, logo, content, description) VALUES (?, ?, ?, ?)`,[title_id, image, content, description]);
        res.status(200).send({message: 'Data added successfully', whyus: whyus});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server Error', error});
    }
}
 
export const updatewhyusController = async(req, res) => {
    try{
        const {id} = req.params;
        const {title_id, content, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let whyus;
        if(image == null){
            const result = await db.query(`UPDATE why_us2 SET title_id = ?, content = ?, description = ? WHERE id = ?`,[title_id, content, description, id]);
            whyus = result[0];
        }
        else{
            const result = await db.query(`UPDATE why_us2 SET title_id = ?, logo = ?, content = ?, description = ? WHERE id = ?`,[title_id, image, content, description, id]);
            whyus = result[0];
        }
        
        res.status(200).send({message: 'Data updated successfully', whyus: whyus});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server Error', error});
    }
}

export const deletewhyusController = async(req, res) => {
    
    try{
        let id = req.params.id;
        const whyusExist = await db.query(`SELECT * FROM why_us2 WHERE id = ?`, [id]);
        if(!whyusExist){
            return res.status(404).json({msg: "Slider not exist"});
        }
        await db.query(`DELETE FROM why_us2 WHERE id = ? `,[id]);
        res.status(200).json({msg: "whyus deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server Error', error});
    }
}