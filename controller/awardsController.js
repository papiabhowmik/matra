import db from "../config/db.js";

export const homeAwardsController = async (req, res) => {
    try{
        const awards = await db.query("SELECT * FROM home_awards");
        res.status(200).send(
            awards[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in awards',
            error,
        })
    }
}

//GET Single awards
export const getSingleAwardsController = async (req, res) => {
    try{
        const {id} = req.params;
        const awards = await db.query(`SELECT * FROM home_awards WHERE id = ?`,[id]);
        if(!awards){
            return res.status(404).send({
                success: false,
                message: 'awards not found',
            });
        }
        return res.status(200).send(
            awards[0],
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

export const addHomeAwardsController = async (req, res) => {
    try{
        const {content} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        
        if(!image){
            return res.status(400).json({message: 'Image is required.'});
        }
        if(!content){
            return res.status(400).json({message: 'Content is required.'});
        }
        const newawards = await db.query(`INSERT INTO home_awards (image, content)VALUES(?, ?)`,[image, content]);
        
        return res.status(201).json({ message: 'awards added successfully', awards: newawards });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

export const updateHomeAwardsController = async (req, res) => {
    try{
        const {id} = req.params;
        const {content} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let awards;
        if(image == null){
            const awards = await db.query(`UPDATE home_awards SET content = ? WHERE id = ?`, [content, id])
            awards = result[0];
        }
        else{
            const awards = await db.query(`UPDATE home_awards SET image = ?, content = ? WHERE id = ?`, [ image, content, id])
            awards = result[0];
        }
        
        return res.status(200).send({
            success: true,
            message: "awards updated",
            awards,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating awards',
            error
        })
    }
}

export const deleteHomeAwardsController = async (req, res) => {
    try{
        const id = req.params.id;
        const awardsExist = await db.query(`SELECT * FROM home_awards WHERE id = ?`,[id])
        if(!awardsExist){
            return res.status(404).json({msg: "awards not exist"});
        }
        await db.query(`DELETE FROM home_awards WHERE id = ? `,[id]);
        res.status(200).json({msg: "awards deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    


//About section

export const aboutAwardsController = async (req, res) => {
    try{
        const awards = await db.query("SELECT * FROM about_awards");
        res.status(200).send(
            awards[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in awards',
            error,
        })
    }
}

//GET Single awards
export const aboutSingleAwardsController = async (req, res) => {
    try{
        const {id} = req.params;
        const awards = await db.query(`SELECT * FROM about_awards WHERE id = ?`,[id]);
        if(!awards){
            return res.status(404).send({
                success: false,
                message: 'awards not found',
            });
        }
        return res.status(200).send(
            awards[0],
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

export const addAboutAwardsController = async (req, res) => {
    try{
        const {year, title, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        
        if(!image){
            return res.status(400).json({message: 'Image is required.'});
        }
        if(!year){
            return res.status(400).json({message: 'year is required.'});
        }
        if(!title){
            return res.status(400).json({message: 'title is required.'});
        }
        if(!description){
            return res.status(400).json({message: 'description is required.'});
        }
        const newawards = await db.query(`INSERT INTO about_awards (image, year, title, description)VALUES(?, ?,?,?)`,[image, year, title, description]);
        
        return res.status(201).json({ message: 'awards added successfully', awards: newawards });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

export const updateAboutAwardsController = async (req, res) => {
    try{
        const {id} = req.params;
        const {year, title, description} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let awards;
        if(image == null){
            const result = await db.query(`UPDATE about_awards SET year = ?, title = ?, description = ? WHERE id = ?`, [ year, title, description, id])
            awards = result[0];
        }else{
            const result = await db.query(`UPDATE about_awards SET image = ?, year = ?, title = ?, description = ? WHERE id = ?`, [image, year, title, description, id])
            awards = result[0];
        }
        return res.status(200).send({
            success: true,
            message: "awards updated",
            awards,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating awards',
            error
        })
    }
}

export const deleteAboutAwardsController = async (req, res) => {
    try{
        const id = req.params.id;
        const awardsExist = await db.query(`SELECT * FROM about_awards WHERE id = ?`,[id])
        if(!awardsExist){
            return res.status(404).json({msg: "awards not exist"});
        }
        await db.query(`DELETE FROM about_awards WHERE id = ? `,[id]);
        res.status(200).json({msg: "awards deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    


