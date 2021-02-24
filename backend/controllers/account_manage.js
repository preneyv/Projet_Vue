import * as AccountModel from '../models/Schemas/user_schema.js'

function signUp(req, res){

    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            text : "Mot de passe ou Email invalide"
        })
    }

    const user = {
        email,
        password
    }


    if(checkUserExist(email)){
        return res.status(400).json({
            text:"L'utilisateur existe déjà"
        })
    }else{
        return res.status(500).json({
            text:"Une erreur s'est produit. Veuillez réessayer ultérieurement"
        })
    }

    if(addUserToBDD(user)){

        return res.status(200).json({
            text:"Merci pour votre inscription"
        })
    }else{
        return res.status(500).json({
            text:"Une erreur s'est produit. Veuillez réessayer ultérieurement"
        })
    }


}

/**
 * Vérifie si le compte existe ou non
 * @param email Email du nouvel utilisateur
 * @returns {boolean|any}
 */
function checkUserExist(email){

    try{
        const findUser = AccountModel.findOne({
            email
        })
        if (findUser) return true

    }catch (error){
        return JSON.parse({res:'error'})
    }
}

/**
 * Ajoute le nouvel utilisateur à la bdd
 * @param user
 * @returns {boolean|any}
 */
function addUserToBDD(user){
    try{

        const userData = new AccountModel(user);
        const userObject = userData.save();
        return true

    }catch(error){
        return JSON.parse({res:'error'})
    }

}
