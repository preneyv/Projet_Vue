import User from '../models/Schemas/user_schema.js'
import moment from 'moment'
import passwordHash from "password-hash";


/**
 * Gère l'enregistrement d'un nouvel utilisateur dans la BDD
 * @param reqBody
 * @returns {any}
 */
function signup(req, res){

    
    const {name, email, password} = req.body;
    if(!name || !email || !password ){
        return res.status(400).json({
            text : "name, Mot de passe ou Email invalide"
        })
    }

    const user = {
        name,
        email,
        password: passwordHash.generate(password),
    }


    User.findOne({
        email
    }).then((user)=>{

        if(user){
            return res.status(400).json({
                text: "L'utilisateur existe déjà"
            });
        }


    }).catch((error)=>{
        return res.status(500).json({
            error
        }) ;
    });

    const userData = new User(user);
    userData.save()
    .then(()=>{
        return res.status(200).json({
            text: "Inscription réussie - Bienvenue"
        });
    }).catch((error)=>{
        return res.status(500).json({
            error
        }) ;
    });
        
}

/**
 * Gère la connexion d'un utilisateur
 * @param req
 * @param res
 */
function signin(req,res){

    console.log(req.body)
    const {email, password} = req.body

    if (!email || !password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        return res.status(400).json({
            text: "Veuillez renseigner un email et un mot de passe"
        });
    }

    // On check si l'utilisateur existe en base
    User.findOne({ email })
    .then((user)=>{
        if (!user)
            return res.status(400).json({
                text: "L'utilisateur n'existe pas"
            });

        if (!user.authenticate(password))
            return res.status(400).json({
                text: "Mot de passe incorrect"
            });

        return res.status(200).json({
            text: "Authentification réussi",
            utilisateur : user
        });
    }).catch((error)=>{
        console.log(error)
        return res.status(500).json({
            error
        });
    });
        

}

export {signin as login}
export {signup as logup}
