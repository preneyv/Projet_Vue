import AdminAPI from "./AdminAPI.js";


/**
 * Ajoute une nouvelle catégorie en base de donnée.
 * Met à jour les données du projet.
 * Passe par AdminAPI pour qu'une requête Axios soit effectuée.
 * @param project projet à modifer
 * @param tags catégorie à ajouter
 * @returns {Promise<{type: string, message: string}>}
 */
export async function addTag(project, tags) {

    let projectLocal = project
    if(projectLocal.tags.includes(tags))
        return ({type:'error', message:'Cette catégorie est déjà présente dans votre projet.'})


    let res = await AdminAPI.addTagToProject(projectLocal._id,tags)
    const { modified } = res.data
    if(modified === 1) {
        projectLocal.tags = [...projectLocal.tags,tags]
        return {type: 'success', message:`La catégorie ${tags} a bien été ajoutée.`}

    }else{
        return  {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
    }
}

/**
 * Ajoute un nouveau besoin de collaboration en base de donnée.
 * @param project projet à modifier
 * @param typeOfCollab type de la nouvelle collaboration
 * @param arrayOfTechno le tableau des technos demandées
 * @param requiredNb le nomnbre de personne demandées
 * @returns {Promise<{type: string, message: string}>}
 */
export async function addNeededCollab(project, typeOfCollab, arrayOfTechno, requiredNb) {

    let projectLocal = project
    let item =projectLocal.jobs.find((el) =>{ if(el.type === typeOfCollab) return el })

    if (item !== undefined)  return ({type:'error', message:'Cette collaboration est déjà définie dans le projet.'})


    let res = await AdminAPI.addJobRequirement(projectLocal._id,{type:typeOfCollab,requiredNb:Number(requiredNb),skills:[...arrayOfTechno],nameCollabPeople:[]})
    const { modified } = res.data

    if(modified === 1) {
        projectLocal.jobs = [...projectLocal.jobs,{type:typeOfCollab,requiredNb:Number(requiredNb),skills:[...arrayOfTechno],nameCollabPeople:[]}]
        return {type: 'success', message:`Vous venez d'ajouter un nouveau besoin de collaboration.`}

    }else{
        return  {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
    }
}
/**
 * Ajoute un nouveau lien en base de donnée.
 * @param project projet à modifer
 * @param valueSelect type de lien ajouté
 * @param valueInput valeur du lien
 * @returns {Promise<{type: string, message: string}>}
 */
export async function addLink(project, valueSelect, valueInput) {

    let projectLocal = project
    let item = projectLocal.links.find((el) => {
        if(el.title === valueSelect || el.value ===valueInput) return el
    })

    if(item !== undefined && item.title === valueSelect) return ({type: 'error', message: `Vous possèdez déjà un lien ${valueSelect}.`})
    if(item !== undefined && item.value === valueInput) return ({type: 'error', message: `L'adresse ${valueInput} est déjà présente.`})
    if(!valueInput.match(/(https?|ftp|ssh|mailto):\/\/[a-z0-9/:%_+.,#?!@&=-]+/gi)) return ({type:'error', message: "L'adresse saisie n'est pas valide."})


    let res = await AdminAPI.addLinkToProject(projectLocal._id,{title:valueSelect,value:valueInput})
    const { modified } = res.data
    if(modified === 1) {
        projectLocal.links = [...projectLocal.links,{title:valueSelect,value:valueInput}]
        return ({type: 'success', message: `La lien ${valueSelect} a bien été ajouté.`})

    }else{
        return  ({type: 'error', message: `Un problème s'est produit. Réessayez plus tard.`})
    }
}

/**
 *
 * @param project projet à modifer
 * @param valueInput valeur de la nouvelle description
 * @returns {Promise<{type: string, message: string}>}
 */
export async function setDescription(project, valueInput) {

    let projectLocal = project

    let res = await AdminAPI.setDescription(projectLocal._id,valueInput)
    const { modified } = res.data

    if(modified === 1) {
        projectLocal.description = valueInput
        return {type: 'success', message:`La description a bien été modifiée.`}

    }else{
        return  {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
    }
}

/**
 * Retire un collaborateur du projet ou simplement une collaboration sur laquelle il est présent.
 * @param project projet à modifier
 * @param idCollab identifiant en BDD du collaborateur
 * @param nameCollab nom du collaborateur
 * @param typeCollab type de la collaboration
 * @returns {Promise<{type: string, message: string}>}
 */
export async function removeOneCollab(project, idCollab, nameCollab, typeCollab) {

    let projectLocal = project

    let res = await AdminAPI.removeCollabFromProject(projectLocal._id, idCollab, typeCollab)
    const { modified } = res.data

    if(modified === 1) {

        if(typeCollab !== undefined) {
            let obj = projectLocal.jobs.find((el) => el.type === typeCollab)
            let person = obj.nameCollabPeople.findIndex((p) => p._collab === idCollab)
            obj.nameCollabPeople.splice(person,1)
            return {type: 'success', message:`${nameCollab} n'est plus ${typeCollab} sur le projet.`}

        }else{
            projectLocal.jobs.forEach((el) => {
                let person = el.nameCollabPeople.findIndex((p) => p._collab === idCollab)
                if(person !== -1) el.nameCollabPeople.splice(person,1)
            })
            return {type: 'success', message:`${nameCollab} a été retiré(e) du projet.`}
        }


    }else{
        return {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
    }
}

/**
 * Accepte  une demande de collaboration.
 * @param project projet à modifier
 * @param collab la nouvelle collaboration à examiner
 * @param index de la collaboration dans le tableau collabRequest
 * @returns {Promise<{type: string, message: string}>}
 */
export async function acceptNewCollab(project, collab, index) {

    let isMissing = true
    let projectLocal = project
    let obj = projectLocal.jobs.find((el) => el.type === collab.type)

    if(obj?.nameCollabPeople.length +1 > obj?.requiredNb) {
        return {type: 'error', message:`Vous ne pouvez pas ajouter plus de ${collab.type}`}

    }

    if(obj !== undefined) {
        obj.nameCollabPeople.forEach((el) => {
            if(el._collab === collab._id) {
                isMissing = false
            }

        })
    }

    if (isMissing === false) return {type: 'error', message:`${collab.name} est déjà ${collab.type} sur le projet`}

    let res = await AdminAPI.addCollabToProject(projectLocal._id, collab)
    const {modified} = res.data ?? ""

    if(modified === 1) {

        obj.nameCollabPeople = [...obj.nameCollabPeople, {name: collab.name, _collab: collab._id}]
        projectLocal.collabRequest.splice(index, 1)
        return {type: 'success', message:`Vous avez ajouté ${collab.name} au projet.`}

    }else {
        return {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
    }

}

