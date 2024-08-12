# Cinaye Burger

## Description

Cinaye Burger est une application web de gestion des commandes pour un restaurant de burgers. Le projet permet aux gestionnaires d'ajouter, modifier, archiver des burgers, ainsi que de gérer les commandes des clients. Les clients peuvent consulter le catalogue des burgers, voir les détails d'un burger et passer des commandes.

## Prérequis

- Node.js
- npm (ou yarn)
- json-server

## Installation

1. Clonez le dépôt dans votre répertoire local :

    ```bash
    git clone https://github.com/MARAMATA/cinaye-burger.git
    ```

2. Naviguez vers le répertoire du projet :

    ```bash
    cd ~/OneDrive/Bureau/cinaye-burger
    ```

3. Installez les dépendances pour le projet React :

    ```bash
    cd react-app
    npm install
    ```

## Lancer le projet

### Étape 1 : Démarrez json-server

Assurez-vous que vous êtes dans le répertoire principal du projet où se trouve `db.json` :

```bash
cd ~/OneDrive/Bureau/cinaye-burger
json-server --watch db.json --port 3001
