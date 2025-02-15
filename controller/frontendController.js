import db from '../config/db.js';

export const sliderController = async (req, res) => {
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

export const basicInfoController = async (req, res) => {
    try{
        const info = await db.query("SELECT title, image FROM home_basic_info");
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
export const overviewController = async (req, res) => {
    try{
        const info = await db.query("SELECT content, description FROM home_basic_info");
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
export const clientsController = async (req, res) => {
    try{
        const clients = await db.query("SELECT * FROM home_clients")
        res.status(200).send(clients[0])
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in clients',
            error,
        })
    }
}
export const homeServiceController = async (req, res) => {
    try{
        const service = await db.query("SELECT * FROM home_service")
        res.status(200).send(service[0])
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in service',
            error,
        })
    }
}

export const projectsController = async (req, res) => {
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

export const awardsController = async (req, res) => {
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
export const aboutOverviewController = async (req, res) => {
    try{
        const overview = await db.query("SELECT * FROM about_overview");
        res.status(200).send(
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

export const aboutCareerController = async (req, res) => {
    try{
        const career = await db.query("SELECT * FROM about_career");

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

export const serviceController = async (req, res) => {
    try{
        const service = await db.query("SELECT * FROM service");
        const formatedService = service[0].map(item => {
            const descriptions = [];
            for(let i=1; i<=6; i++){
                if(item[`info${i}`]){
                    descriptions.push(item[`info${i}`]);
                }
            } 
            return {
                name: item.name,
                descriptions: descriptions
            };
            
        });
        res.status(200).send(formatedService);
    }catch(error){
        console.log(error);
        res.send(500).send({
            success:false,
            message:'Error in service',
            error,
        })
    }
}

export const whyusController = async(req, res) => {
    try{
        const whyus = await db.query("SELECT w1.*, w2.*  FROM why_us2 as w2 LEFT JOIN why_us1 as w1 ON w1.id = w2.title_id");
        const groupData = whyus[0].reduce((acc, item) => {
            if(!acc[item.title]){
                acc[item.title] = {
                    name: item.title,
                    smallCard: []
                };
            }
            acc[item.title].smallCard.push({
                logo: item.logo,
                title: item.content,
                description: item.description
            });
            return acc;
        }, {});
        const formatedData = Object.values(groupData);
        res.status(200).json(formatedData);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server Error', error});
    }
}
 
export const portfolioController = async (req, res) => {
    try{
        const portfolios = await db.query("SELECT * FROM portfolio");
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

export const innovationController = async (req, res) => {
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