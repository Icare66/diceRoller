# JavaScript Dice Roller

Projet réalisé dans le cadre de ma formation

## Livrable attendu

* Un jeu fonctionnel
* Une interface lisible qui correspond à la maquette fournie

### fonctionalités globales:

* possibilité de créer une nouvelle partie 
* possibilité de retenir le score courant
* possibilité de lancer le dé
* possibilité d'avoir deux joueurs

## Contexte du Projet

Le jeu comprend 2 joueurs sur un seul et même écran. 
Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).
À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le 
résultat d’un lancer est ajouté au ROUND. 

Lors de son tour, le joueur peut décider à tout moment de:
- Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le
tour de l’autre joueur.
- Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
Le premier joueur qui atteint les 100 points sur global gagne le jeu.

### maquette 

https://i.imgur.com/WgrX6NL.png


