import db from "../config/db.js";


export const getPortfolioCategoryController = async (req, res) => {
    try{
        const portfolios = await db.query("SELECT * FROM portfolio_category");
        res.status(200).send(
            portfolios[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in portfolio',
            error,
        })
    }
}
export const getPortfolioController = async (req, res) => {
    try{
        const portfolios = await db.query("SELECT p.*, c.name FROM portfolio p left join portfolio_category c on c.id=p.portfolio_id");
        res.status(200).send(
            portfolios[0],
        )
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in portfolio',
            error,
        })
    }
}

//GET Single portfolio
export const getSinglePortfolioController = async (req, res) => {
    try{
        const {id} = req.params;
        const portfolio = await db.query(`SELECT * FROM portfolio WHERE id = ?`,[id]);
        if(!portfolio){
            return res.status(404).send({
                success: false,
                message: 'portfolio not found',
            });
        }
        return res.status(200).send(
            portfolio[0],
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

export const addPortfolioController = async (req, res) => {
    try{
        const {portfolio_id, title, description, link, project_link} = req.body;
        const image = req.files['image'] ? req.files['image'][0].filename : null;
        const big_image = req.files['big_image'] ? req.files['big_image'][0].filename : null;
        console.log("image "+image);
        console.log("big image "+big_image);
        if(!portfolio_id){
            return res.status(400).json({message: 'portfolio_id is required.'});
        }
        // if(!image){
        //     return res.status(400).json({message: 'image_video is required.'});
        // }
        if(!title){
            return res.status(400).json({message: 'Title is required.'});
        }
        // if(!description){
        //     return res.status(400).json({message: 'description is required.'});
        // }
        // if(!link){
        //     return res.status(400).json({message: 'link is required.'});
        // }
        const newportfolio = await db.query(`INSERT INTO portfolio (portfolio_id, image_video, big_image, link, title, description, project_link)VALUES(?, ?, ?, ?, ?, ?, ?)`,[portfolio_id, image, big_image, link, title, description, project_link]);
        
        return res.status(201).json({ message: 'portfolio added successfully', portfolio: newportfolio });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}
 
export const updatePortfolioController = async (req, res) => {
    try{
        const {id} = req.params;
        const {portfolio_id, link, title, description, project_link} = req.body;
        const image_video = req.files['image'] ? req.files['image'][0].filename : null;
        const big_image = req.files['big_image'] ? req.files['big_image'][0].filename : null;
        let portfolio;
        if(image_video == null && big_image == null){
            const result = await db.query(`UPDATE portfolio SET portfolio_id = ?, link=?, title = ?, description = ?, project_link = ? WHERE id = ?`, [portfolio_id, link, title, description, project_link, id])
            portfolio = result[0];
        }
        else if(image_video == null){
            const result = await db.query(`UPDATE portfolio SET portfolio_id = ?,  big_image = ?, link=?, title = ?, description = ?, project_link = ? WHERE id = ?`, [portfolio_id,  big_image, link, title, description, project_link, id])
            portfolio = result[0];
        }
        else if(big_image == null){
            const result = await db.query(`UPDATE portfolio SET portfolio_id = ?, image_video = ?, link=?,  title = ?, description = ?, project_link = ? WHERE id = ?`, [portfolio_id, image_video, link, title, description, project_link, id])
            portfolio = result[0];
        }
        else{
            const result = await db.query(`UPDATE portfolio SET portfolio_id = ?, image_video = ?, big_image = ?,  link=?, title = ?, description = ?, project_link = ? WHERE id = ?`, [portfolio_id, image_video, big_image, link, title, description, project_link, id])
            portfolio = result[0];
        }
        return res.status(200).send({
            success: true,
            message: "portfolio updated",
            portfolio,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating portfolio',
            error
        })
    }
}

export const deletePortfolioController = async (req, res) => {
    try{
        const id = req.params.id;
        const portfolioExist = await db.query(`SELECT * FROM portfolio WHERE id = ?`,[id])
        if(!portfolioExist){
            return res.status(404).json({msg: "portfolio not exist"});
        }
        await db.query(`DELETE FROM portfolio WHERE id = ? `,[id]);
        res.status(200).json({msg: "portfolio deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
}
    