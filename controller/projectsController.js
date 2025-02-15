import db from "../config/db.js";


export const homeProjectsController = async (req, res) => {
    try{
        const project = await db.query("SELECT * FROM home_projects");
        res.status(200).send(
            project[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in project',
            error,
        })
    }
}

//GET Single project
export const getSingleProjectController = async (req, res) => {
    try{
        const {id} = req.params;
        const project = await db.query(`SELECT * FROM home_projects WHERE id = ?`,[id]);
        if(!project){
            return res.status(404).send({
                success: false,
                message: 'project not found',
            });
        }
        return res.status(200).send(
            project[0],
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

export const addHomeProjectController = async (req, res) => {
    try{
        const {title} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        if(!title){
            return res.status(400).json({message: 'Title is required.'});
        }
        if(!image){
            return res.status(400).json({message: 'Image is required.'});
        }
        const project = await db.query(`INSERT INTO home_projects (title, image)VALUES(?, ?)`,[title,image]);
        
        return res.status(201).json({ message: 'project added successfully', project: project });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

export const updateHomeProjectController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let project;
        if(image == null){
            const result = await db.query(`UPDATE home_projects SET title = ?  WHERE id = ?`, [title, id])
            project = result[0];
        }
        else{
            const result = await db.query(`UPDATE home_projects SET title = ?, image = ? WHERE id = ?`, [title, image, id])
            project = result[0];
        }
        
        return res.status(200).send({
            success: true,
            message: "project updated",
            project,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating project',
            error
        })
    }
}

export const deleteHomeProjectController = async (req, res) => {
    try{
        const id = req.params.id;
        const projectExist = await db.query(`SELECT * FROM home_projects WHERE id = ?`,[id])
        if(!projectExist){
            return res.status(404).json({msg: "project not exist"});
        }
        await db.query(`DELETE FROM home_projects WHERE id = ? `,[id]);
        res.status(200).json({msg: "project deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    