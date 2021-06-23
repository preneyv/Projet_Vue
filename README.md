
<div style="display: flex">
<img src="./frontend/src/assets/icon_title.png" width="50" height="50"/>
<h1 align="center">
   Le Marché de l'Open Source
</h1>
</div>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) 


Cette application a pour but d'aider les porteurs de projets. Cette plateforme les met alors en relation avec d'autres personnes qui souhaiteraient participer au projet.

# ⚙ Installation

Il faut installer différentes dépendances avant de démarrer le projet.

Côté Frontend :
- Rendez-vous dans le dossier **frontend** avec la commande ```cd frontend```.
- Puis saisissez la commande ```npm install``` ou ```yarn install```pour installer toutes les dépendances.

Coté Backend : 
- Rendez-vous dans le dossier **backend** avec la commande ```cd backend```.
- Puis saisissez la commande ```npm install``` ou ```yarn install``` pour installer toutes les dépendances.

# 🚀  Démarrage

Il faut démarrer les deux parties de l'application.

Coté Frontend :
- Rendez-vous dans le dossier **frontend** avec la commande ```cd frontend```.
- Puis saisissez la commande ```npm run serve``` ou ```yarn serve```.

Coté Backend :
- Rendez-vous dans le dossier **backend/src** avec la commande ```cd backend/src```
- Puis saisissez la commande ```node index.js``` ou ```yarn serve```.

#  Technos utilisées

Ce projet a été développé avec le framework VueJs en front. Le serveur en back a été développé avec l'aide la librairie expressjs ainsi que mongoose pour la gestion de la base de donnée.

Framework Frontend :
* [VueJs](https://vuejs.org/)

Principales Librairies Frontend :
* [Axios](https://www.npmjs.com/package/axios) - Librairie de gestion de promesses et de requetes d'API.
* [Sass-loader](https://www.npmjs.com/package/sass-loader)  - Librairie pour pouvoir intégrer le SCSS.

Principales Librairies Backend :
* [ExpressJs](https://expressjs.com/fr/) - Librairie permettant de mettre en place un serveur node simple, rapide et fonctionnel.
* [Mongoose](https://mongoosejs.com/) - Librairie de gestion de base de données NoSQL. 
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) - Librairie de générateur de tokens pour l'authentification.

# Pages du site
* **Accueil**
* **Page de connexion**
* **Page de création de compte**
* **Liste des projets** (*voir "Fonctionnalités de la page Liste des projets"*)
* **Page d'un projet** 
* **Page de compte**
* **Dashboard** (*voir "Fonctionnalités du Dashboard"*)

# 📖  Fonctionnalités de la page Liste des projets
Cette page permet de visualiser tous les projets recensés sur l'application.
Il est possible de rechercher un projet selon différents critères :
* Par son nom.
* Par l'une de ses catégories.
* Par la licence à laquelle est lié le projet.
* Par le type de collaboration parmis toutes celles requises par le projet.

# 📖  Fonctionnalités du Dashboard
Cette page permet à l'utilisateur de visualiser tous les projets auxquels il participe. Que ce soit en tant qu'administrateur ou collaborateur.
En choisissant un projet dans la liste il peut visualiser l'ensemble de la configuration du projet.
Dans la partie de la page reservée au projet, l'utilisateur peut observer :
* Les types de collaborations requises pour le projet. 
  Par type, est affiché le nombre requis de collaborateurs ainsi que  le nombre de collaborateur déjà présents sur le projet.
* La description du projet.
* Les catégories du projet.
* L'état actuel du projet.
* Les collaborateurs présents sur le projet ainsi que leurs fonctions.
* Les liens utiles du projet.

###### Quand on est collaborateur :
Il est impossible à l'utilisateur de modifier quoique ce soit à la configuration du projet.
La seule chose qu'il peut faire est de se retirer du projet (*Fonction non développée*).

###### Quand on est administrateur :
On peut effectuer divers modifications sur le projet.
* Ajouter un nouveau besoin en collaboration.
* Changer la description du projet.
* Ajouter une catégorie au projet.
* Ajouter un lien au projet.
* Retirer un collaborateur du projet.
* Déclarer le projet terminé.
* Supprimer le projet (*Fonction non développée*)

## Le compte utilisateur
Cette page affiche les informations de compte de l'utilisateur :
* Nom
* Prénom
* Email
* Date d'inscription

Lorsque l'on est super-utilisateur (administrateur de l'application) on peut également y observer tous les messages 
envoyés via le formulaire de contact.

## Points d'amélioration
Backend :
* En cas d'extension du projet, une base de données relationnelles serait préférables pour l'utilisation de jointures.
  
Frontend :
* Un journal de bord dans le dashboard pour suivre les dates clés du projets (Un espace déstiné à ça a d'ailleurs été créé).
* Possibilité de supprimer des catégories et des liens du projet.
* Possibilité de modifier et ou de supprimer un type de collaboration.

# 🧐 Auteurs
Ce projet a été développé par :
* **Valère Preney** [@preneyv](https://github.com/preneyv)
* **Aurélien Robineau** [@aurelien-robineau](https://github.com/aurelien-robineau)
* **Hippolyte Soulier** [@hsoulier](https://github.com/hsoulier)

# License
Ce projet a été développé dans le cadre de l'UE de Javascript du professeur Gilles Chagnon.
Licence Professionnelle projet web et mobile.
Université de la Sorbonne - CFA des Sciences.




