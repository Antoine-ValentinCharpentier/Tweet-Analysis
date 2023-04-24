# Tweets Analysis

## Présentation
### Objectif
Implémenter deux algorithmes de Machines Learning (un non-supervisé et un autre supervisé) pour la détection de profils « atypique » de Twitter. Réaliser des clusters et une classification des différents profils des utilisateurs.

### Contenu d'un tweet
Pour mener à bien cette analyse nous avons eu recours à un dataset regroupant environ 4,6 millions de Tweets (27,6 Go). Celui-ci peut être téléchargé via le lien suivant : [Cliquer ici](https://www.dropbox.com/s/qfhaobip55xxkif/Tweet%20Worldcup.zip?dl=0)

A noter qu'un tweet est décrit par les attributs suivants :
![image](https://user-images.githubusercontent.com/84742989/233933613-5af20a58-31a8-4eda-ad0d-cc792b1bfd22.png)


### Membres de l'équipe
Ce projet a été mené par :
- Antoine-Valentin CHARPENTIER
- Esso-Manam MANGANMANA
- Florian BOURRIER
- Gnouyarou Marc-Arthur KADANGHA

### Structure du projet
- ``script`` : Dossier qui contient les algorithmes à la fois de classification/clustering ainsi que des utilitaires pour exemple insérer les tweets dans la base de données MongoDB, ...
- ``data`` : stocke les différents tweets
- ``requirement.txt`` : récapitule les bibliothèques qui ont besoin d'être installé pour que le projet fonctionne
- ``docker-compose.yml`` permet de configurer une instance de MongoDB dans un container docker pour un utilisateur mongodb avec pour mot de passe mongo. Le script ``init-mongo.js`` quand à lui permet d'attribuer des droit de lecture et d'écriture sur la base de données configurée par le ``docker-compose.yml``

## Mise en place
### Prérequis
1. Avoir Docker OU MongoDB d'installer (dans ce deuxième cas, il peut être nécessaire de changer l'URI de la base de données MongoDB dans les fichiers de script)
2. D'avoir python 3 d'installé
3. D'avoir les différentes bibliothèques nécessaires au bon fonctionnement du projet d'installer
```
pip install -r requirements.txt
```

### Démarche
1. Allumer la base de données MongoDB. La commande suivante est à utiliser si vous utilisez Docker Compose.
```
docker compose up
```
2. Déposer les tweets dans le dossier ``data`` présent à la racine du projet
3. Lancer le script présent dans le fichier ``script/utils/importData.ipynb`` pour pouvoir insérer les différents tweets dans la base de données.
