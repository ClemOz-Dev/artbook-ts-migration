# projet-03-artbook-back

# Démarrer le projet

### Installer les packages

```bash
yarn
```

### Docker PostgreSQL :

```bash
docker compose up --build -d
```

### Initialiser la base de données

```bash
node scripts/init-database.js
```

### Démarrer le serveur

```bash
yarn dev
```

# CDC :

Ce projet vise à révolutionner la gestion des œuvres d'art à travers une plateforme novatrice. Cette solution digitale s'adresse aux artistes, galeristes et collectionneurs, offrant une expérience intuitive et fonctionnelle pour faciliter la présentation, la gestion et la découverte d'œuvres artistiques.

Dans cet écosystème, les artistes peuvent présenter leurs œuvres, les galeristes peuvent les sélectionner pour organiser des expositions, et les collectionneurs peuvent explorer la variété des œuvres et expositions proposées.

Notre ambition est de répondre aux besoins du marché de l'art en centralisant les ressources et en créant une plateforme unifiée pour les créateurs, les promoteurs et les passionnés d'art. Nous aspirons à simplifier et à enrichir l'expérience artistique, renforçant ainsi les interactions au sein de la communauté artistique.

# Techno back

Backend : Node.js avec Express : Nous avons choisi Node.js comme technologie de backend en raison de sa rapidité d'exécution, de sa scalabilité et de sa grande communauté de développeurs. Express.js, en tant que framework pour Node.js, nous permet de construire rapidement des API REST robustes pour notre application.

# Workflow git:

main > release > develop >
feature/...,
feature/...,
feature/...

## Sequelize-cli commands

#### Drop database
```bash
yarn sequelize-cli db:drop
```

#### Migrate

`yarn sequelize-cli db:migrate`
`yarn sequelize-cli db:migrate:undo`

#### Seeding

`yarn sequelize-cli db:seed:all`
`yarn sequelize-cli db:seed:undo:all`

### Nodemailer

Suggestion d'utilisation :

- Se créer un compte sur mailtrap
- Sur email testing récupérer les credentials et les remplacer dans le .env
- Appelle de la route forgot-password, le mail est réceptionné dans mailtrap


## LOGGER

#### Entrer dans le container

```bash
docker exec -it mongodb bash
```

#### Entrer mongo

```bash
docker mongos
```

#### S'authentifier

```bash
db.getSiblingDB("artbook").auth("artbook", "artbook")
```

#### Entrer dans la base de données

```bash
use artbook
```

#### Consulter les logs
Utiliser la commande la plus appropriée à vos besoins.
Exemple, tous les logs en partant du plus récent :
```bash
db.log.find().sort({ timestamp: -1 })
```

