import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mySqlPool from "./config/db.js";
import matraRoutes from "./routes/matraRoutes.js"
import frontendRoutes from "./routes/frontendRoutes.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res)=>{
    res.status(200).send('<h1>This is home page</h1>')
})
// app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use("/api/matra", matraRoutes);
app.use("/frontend/matra", frontendRoutes);
app.use('/upload', express.static('upload'));

const PORT = process.env.PORT || 8080;

mySqlPool
    .query('SELECT 1')
    .then(() => {
        console.log('Mysql DB Connected');
        app.listen(PORT, () => {
            console.log('Server Running port 8000');
        })
    })
    .catch((error) => {
        console.log(error);
    });