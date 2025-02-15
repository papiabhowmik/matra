import db from '../config/db.js';

export const homeInfoController = async (req, res) => {
    try{
        const info = await db.query("SELECT * FROM home_basic_info");
        res.status(200).send(
            info[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in home info',
            error,
        })
    }
}

export const singleHomeInfoController = async (req, res) => {
    try{
        const {id} = req.params;
        const info = await db.query(`SELECT * FROM home_basic_info where id = ?`,[id]);
        res.status(200).send(
            info[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in home info',
            error,
        })
    }
}


export const updateHomeInfoController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, content, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let info;
        if(image == null){
            const result = await db.query(`UPDATE home_basic_info SET title = ?, content = ?, description = ? WHERE id = ?`, [title, content, description, id])
            info = result[0];
        }
        else{
            const result = await db.query(`UPDATE home_basic_info SET title = ?, image = ?, content = ?, description = ? WHERE id = ?`, [title, image, content, description, id])
            info = result[0];
        }
        return res.status(200).send({
        success: true,
        message: "Home info updated",
        info,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating info',
            error
        })
    }
}