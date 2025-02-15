import db from "../config/db.js";

//GET Single overview
export const singleAboutOverviewController = async (req, res) => {
    try{
        const {id} = req.params;
        const overview = await db.query(`SELECT * FROM about_overview WHERE id = ?`,[id]);
        if(!overview){
            return res.status(404).send({
                success: false,
                message: 'Overview not found',
            });
        }
        return res.status(200).send(
            overview[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single blog',
            error
        })
    }
}
export const aboutOverviewController = async (req, res) => {
    try{
        const overview = await db.query(`SELECT * FROM about_overview`);
        if(!overview){
            return res.status(404).send({
                success: false,
                message: 'Overview not found',
            });
        }
        return res.status(200).send(
            overview[0],
        )
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single blog',
            error
        })
    }
}

export const updateAboutOverviewController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description} = req.body;
        const overview = await db.query(`UPDATE about_overview SET title = ?, description = ? WHERE id = ?`, [title, description, id])
        return res.status(200).send({
            success: true,
            message: "Overview updated",
            overview,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating Overview',
            error
        })
    }
}
