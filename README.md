# Tweets Analysis

## Présentation
### Objectif
Implémenter deux algorithmes de Machines Learning (un non-supervisé et un autre supervisé) pour la détection de profils « atypique » de Twitter. Réaliser des clusters et une classification des différents profils des utilisateurs.

Par « atypique » nous entendions des profils d'utilisateurs qui se distingues des autres. Cela peut se manifester par une publications importante de tweets, avoir un nombre d'amis/de folowers important, envoyer des tweets avec un contenu sensible, avoir un profil vérifié, ...

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
- ``script`` : Dossier qui contient les algorithmes à la fois de classification/clustering ainsi que des utilitaires pour par exemple insérer les tweets dans la base de données MongoDB, ...
- ``data`` : Dossier qui stocke les différents tweets
- ``requirement.txt`` : récapitule les bibliothèques qui ont besoin d'être installé pour que le projet fonctionne
- ``docker-compose.yml`` permet de configurer une instance de MongoDB dans un container docker pour un utilisateur mongodb avec pour mot de passe mongo. Le script ``init-mongo.js`` quand à lui permet d'attribuer des droit de lecture et d'écriture sur la base de données configurée par le ``docker-compose.yml``

## Mise en place
### Prérequis
1. Avoir Docker OU MongoDB d'installer (dans ce deuxième cas, il peut être nécessaire de changer l'URI de la base de données MongoDB dans les fichiers de script)
2. D'avoir python 3 d'installé
3. Cloner le projet:  
```git clone git@github.com:Antoine-ValentinCharpentier/Tweet-Analysis.git```
4. Se déplacer dans le répertoire:  
```cd Tweet-Analysis```
5. Initialiser l'environnement virtuel:  
```
python -m venv .venv
.venv\Scripts\activate OU source .venv/bin/activate
pip install -r requirements.txt
```

### Démarche
1. Allumer la base de données MongoDB. La commande suivante est à utiliser si vous utilisez Docker Compose.
```
docker compose up
```
2. Déposer les tweets dans le dossier ``data`` présent à la racine du projet
3. Lancer le script présent dans le fichier ``script/utils/importData.ipynb`` pour pouvoir insérer les différents tweets dans la base de données.
4. Lancer le script présent dans le fichier ``script/utils/createUsers.ipynb`` pour pouvoir isoler les différents utilisateurs, calculer des attributs supplémentaires sur ceux-ci et les normaliser.
5. Lancer le script présent dans le fichier ``script/utils/previewUsers.ipynb`` pour pouvoir visualiser rapidement la distribution des différents attributs des utilisateurs.
6. Lancer le script ``script/utils/acp.ipynb`` pour effectuer une ACP et voir s'il est possible ou non de réduire le nombre de dimensions et donc accélérer les calculs ultérieurs.
7. Lancer le script présent dans le fichier ``script/utils/clustering.ipynb``. Celui-ci exécutera un algorithme de clustering sur nos utilisateurs, qui n'est rien de moins que le K-means. Les labels générés sont sauvegardés dans une collection distincte.
8. Effectuer la labélisation des utilisateurs. Pour ce faire, nous vous proposons deux solutions :
    - Réaliser la labélisation manuellement. Pour cela, nous mettons à votre disposition une interface graphique dans le script ``script/utils/LabelingUI.ipynb`` qui vous présentera un par un chaque utilisateur et vous demandera de cliquer soit sur un bouton vert pour dire qu'il est normal, soit sur un bouton rouge pour dire qu'il est atypique. Le programme ne vous affichera que les utilisateurs qui n'ont jamais été labélisés. À noter que la labélisation peut être effectuée en plusieurs étapes. Vous pouvez labéliser une partie des données un jour, puis une autre un autre jour. Par ailleurs, afin de simplifier la labélisation manuelle, nous avons ajouté une petite fonctionnalité sur cette interface qui met en évidence les valeurs des attributs qui nous paraissent atypiques. De plus, ce script se chargera de normaliser les différentes données.
    - Effectuer la labélisation de manière automatique à l'aide du script ``script/utils/userLabeling.ipynb``. Cette deuxième méthode est certainement moins précise, mais elle permet de gagner beaucoup de temps. Cette méthode utilise des règles que nous avons fixées de manière rigide. Si l'un des attributs qui, selon nous, pourrait rendre un utilisateur atypique est dépassé, alors l'utilisateur est directement considéré comme atypique.
9. Lancer le script présent dans le fichier ``script/utils/classificationSvm.ipynb``. Celui-ci exécutera un algorithme de classification sur nos utilisateurs à l'aide des données précédemment labélisées. Cet algorithme n'est rien de moins que le SVM. Les labels générés sont sauvegardés dans une collection distincte.
10. Lancer le script présent dans le fichier ``script/utils/CompareBoth.ipynb`` afin de comparer les résultats des deux algorithmes de machine learning.

## Remarques
À chaque étape du traitement effectué, nous avons décidé de stocker les calculs dans une nouvelle collection MongoDB sans écraser la précédente. En effet, les calculs réalisés peuvent prendre du temps. Ainsi, en cas d'erreur lors de l'écriture d'un nouveau script, nous n'avons pas besoin de relancer l'intégralité des scripts précédents.
