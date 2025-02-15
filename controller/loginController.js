import db from '../config/db.js';
import { comparePassword, hashPassword} from "../helper/authHelper.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) =>{
    try{
        const {username, password} = req.body;
        if(!username){
            return res.send({message: 'Username is required'})
        }
        
        if(!password){
            return res.send({message: 'password is required'})
        }
        
        const exisitingUser = await db.query(`SELECT * FROM login WHERE username = ?`, [username]);
        //exisiting user
        if(!exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login'
            })        
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await db.query(`INSERT INTO login (username, password) VALUES (?,?)`, [username, hashedPassword]);
        // const user = await new userModel({username, password:hashedPassword}).save()
        res.status(201).send({
            success: true,
            message:'User Register Successfully',
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Registration',
            error,
        })
    };
};


export const loginController = async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(404).send({
                success:false,
                message: 'Enter username or password'
            })
        }
        //check user
        const [user] = await db.query(`SELECT * FROM login WHERE username = ?`,[username]);
        if(!user){
            return res.status(404).send({
                success: false,
                message:'username is not register'
            })
        }
        // console.log(user[0].password);
        const match = await comparePassword(password, user[0].password)
        if(!match){
            return res.status(200).send({
                success:false,
                message: 'Invalid password'
            })
        }
        //token
        const token = await JWT.sign({id:user.id}, process.env.JWT_SECRET,{
            expiresIn: "1d",
        });
        res.status(200).send({
            success: true,
            message:'Login Successfully',
            token,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        })
    }
}
 
 