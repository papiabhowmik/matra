import db from "../config/db.js";


export const homeSliderController = async (req, res) => {
    try{
        const sliders = await db.query("SELECT * FROM home_banner");
        res.status(200).send(
            sliders[0],
        )
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in slider',
            error,
        })
    }
}

//GET Single Slider
export const getSingleSliderController = async (req, res) => {
    try{
        const {id} = req.params;
        const slider = await db.query(`SELECT * FROM home_banner WHERE id = ?`,[id]);
        if(!slider){
            return res.status(404).send({
                success: false,
                message: 'Slider not found',
            });
        }
        return res.status(200).send(
            slider[0],
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

export const addHomeSliderController = async (req, res) => {
    try{
        
        const {title} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
 
        if(!title){
            return res.status(400).json({message: 'Title is required.'});
        }
        if(!image){
            return res.status(400).json({message: 'Image is required.'});
        }
        const newSlider = await db.query(`INSERT INTO home_banner (title, image)VALUES(?, ?)`,[title,image]);
        
        return res.status(201).json({ message: 'Slider added successfully', slider: newSlider });
    }catch(error){
        console.log(req.filename);  // Add this line to check the contents of req.file

        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}
 
export const updateHomeSliderController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        let slider;
        if (image == null) {
            const result = await db.query(`UPDATE home_banner SET title = ? WHERE id = ?`, [title, id]);
            slider = result[0];
          } 
         
          else {
            const result = await db.query(`UPDATE home_banner SET title = ?, image = ? WHERE id = ?`, [title, image, id]);
            slider = result[0]; 
          }
        
        return res.status(200).send({
            success: true,
            message: "Slider updated",
            slider,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating Slider',
            error
        })
    }
}

export const deleteHomeSliderController = async (req, res) => {
    try{
        const id = req.params.id;
        const sliderExist = await db.query(`SELECT * FROM home_banner WHERE id = ?`,[id])
        if(!sliderExist){
            return res.status(404).json({msg: "Slider not exist"});
        }
        await db.query(`DELETE FROM home_banner WHERE id = ? `,[id]);
        res.status(200).json({msg: "Slider deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    