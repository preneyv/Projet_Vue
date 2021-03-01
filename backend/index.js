import express from 'express'
import {db} from './models/bdd_manage.js'
import bodyParser from "body-parser";
import * as connection from './controllers/account_manage.js'
import dotenv from 'dotenv'
dotenv.config()

//On définit notre objet express nommé app
const app = express();
db.initDatabase()


//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.get('/',(req, res)=> {
    console.log(req)
})
//Définition du routeur
//const router = express.Router();
app.post("/user/login", connection.login);
app.post("/user/logup", connection.logup);
//import("./controllers/userController.js").then((module)=>{module.default(router)});

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => {console.log(`Listening on port ${port}`)});