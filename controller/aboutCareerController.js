import db from '../config/db.js';
//GET Single career
export const aboutSingleCareerController = async (req, res) => {
    try{
        const {id} = req.params;
        const career = await db.query(`SELECT * FROM about_career WHERE id = ?`,[id]);
        if(!career){
            return res.status(404).send({
                success: false,
                message: 'career not found',
            });
        }
        return res.status(200).send(
            career[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting career',
            error
        })
    }
}

export const aboutCareerController = async (req, res) => {
    try{
        const career = await db.query(`SELECT * FROM about_career`);
        if(!career){
            return res.status(404).send({
                success: false,
                message: 'career not found',
            });
        }
        return res.status(200).send(
            career[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting career',
            error
        })
    }
}

export const updateAboutCareerController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let career;
        if(image == null){
            const result = await db.query(`UPDATE about_career SET  title = ?, description = ? WHERE id = ?`, [ title, description, id])
            career = result[0];
        }
        else{
            const result = await db.query(`UPDATE about_career SET  title = ?, image = ?, description = ? WHERE id = ?`, [ title, image, description, id])
            career = result[0];
        }
        return res.status(200).send({
            success: true,
            message: "career updated",
            career,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating career',
            error
        })
    }
}

