# TP Docker (par Robin CARPENTIER)
## 1 - Description du projet
Cette application Docker consiste en : 
- <b>Frontend</b> : C' est une interface web simple (lien -> http://localhost:8080) avec un compteur qui s'incrémente avec le bouton "+" et se désincrémente avec le bouton "-".
- <b>Backend</b> : On utilise une API en Node.js (lien -> http://localhost:3000) qui permet de gérer le compteur et stocker la valeur dans la base de donnée Postgres.
- <b>Base de données</b> : C'est une base de données Postgres, qui est persistant via volume Docker (quand on recharge la page, la valeur reste la même). Elle est non exposée à l'extérieur pour la sécurité.

## 2 - Build du projet
On build le projet avec : 
`docker-compose build`

## 3 - Run/Exécution
On lance l'application complète avec : 
`docker-compose up`

On peut aussi utiliser `-d` pour que ça tourne en arrière-plan.

On vérifie ensuite les containers avec : 
`docker ps`

Pour tester l'API en backend : 
- Pour obtenir la valeur : `curl http://localhost:3000/counter`
- Pour incrémenter la valeur : `curl -X POST http://localhost:3000/counter/incr`
- Pour décrémenter la valeur : `curl -X POST http://localhost:3000/counter/decr
`
## 4 - Bonnes pratiques incluses
- Afin de réduire la taille des images, le Dockerfile est multi-stage. Le build et le runtime sont séparé
- Un volume Docker est utilisé pour que les données persistent même après l’arrêt et le redémarrage des containers.
- On a fait un scan de sécurité avec Trivy (voir le fichier `scan-trivy.txt`).
- On a réussi à tagger, push, pull et donc publier l'image sur Docker Hub (voir le fichier `push-Docker-Hub.txt`).
- Après ce TP, on a fait un nettoyage complet (voir le fichier `nettoyage.txt`).