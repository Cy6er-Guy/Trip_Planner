# 🌍 Planificateur de Voyage

**Planificateur de Voyage** est une application web élégante et fonctionnelle permettant la gestion et la planification de voyages personnels. Elle offre la possibilité d’ajouter des destinations, de visualiser les informations associées (image, description, dates, lien Google Maps), et de sauvegarder ou restaurer les données sous forme de fichier JSON.

## 🧱 Arborescence du projet


```

├── Dockerfile # Image Docker de l’application  
├── app  
│ ├── app.py # Application Flask (backend)  
│ ├── requirements.txt # Dépendances Python  
│ ├── static  
│ │ ├── script.js # Script JavaScript (logique frontend)  
│ │ └── styles.css # Feuille de style CSS  
│ ├── templates  
│ │ └── index.html # Interface utilisateur principale  
│ └── trips.json # Base de données locale (JSON)  
└── docker-compose.yml # Orchestration du service via Docker Compose

```

## 🚀 Déploiement avec Docker

### Prérequis

- Docker
- Docker Compose

### Étapes de déploiement

1. Cloner le dépôt :

```bash
git clone https://github.com/Cy6er-Guy/Trip_Planner.git
cd Trip_Planner

```

2.  Construire et lancer les conteneurs :
    

```bash
docker-compose up --build

```

> L’application sera accessible à l’adresse suivante : `http://localhost:5050`.

## 🔧 API REST

L’interface backend expose les routes suivantes :

-   `GET /api/trips` : récupère l’ensemble des voyages enregistrés.
    
-   `POST /api/trips` : remplace la base de données actuelle avec les nouvelles données envoyées.
    
-   `DELETE /api/trips` : supprime toutes les entrées enregistrées.
    

## 🧰 Technologies utilisées

-   [Python 3.11](https://www.python.org/)
    
-   [Flask](https://flask.palletsprojects.com/) – Framework web léger
    
-   [Quill.js](https://quilljs.com/) – Éditeur de texte riche intégré
    
-   [Docker](https://www.docker.com/) – Conteneurisation
    
-   HTML, CSS, JavaScript
    

## ✍️ Auteur

**Cy6er-Guy**  
 passionné en cybersécurité.

## 📄 Licence

Ce projet est distribué sous la licence [MIT](https://opensource.org/licenses/MIT).
