import db from '../config/db.js';
//GET Single title
export const getTitleController = async (req, res) => {
    try{
        const title = await db.query("SELECT * FROM all_title");
        return res.status(200).send(
            title[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting title',
            error
        })
    }
}
export const singleTitleController = async (req, res) => {
    try{
        const {id} = req.params;
        const title = await db.query(`SELECT * FROM all_title WHERE id = ?`,[id]);
        if(!title){
            return res.status(404).send({
                success: false,
                message: 'title not found',
            });
        }
        return res.status(200).send(
            title[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single title',
            error
        })
    }
}
export const updateTitleController = async (req, res) => {
    try{
        const {id} = req.params;
        const {home_service_title, home_project_title, home_awards_title, about_awards_title, whyus_title} = req.body;
        const title = await db.query(`UPDATE all_title SET  home_service_title = ?, home_project_title = ?, home_awards_title = ?, about_awards_title = ?, whyus_title = ? WHERE id = ?`, [home_service_title, home_project_title, home_awards_title, about_awards_title, whyus_title, id])
        return res.status(200).send({
            success: true,
            message: "title updated",
            title,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating title',
            error
        })
    }
}

