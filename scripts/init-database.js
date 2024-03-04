const { execSync } = require("child_process");
const path = require("path");

try {
  const scriptDirectory = path.dirname(__filename);

  const isTestMode = process.argv.includes("--test");
  const databaseEnv = isTestMode ? "test" : "development";

  console.log(`Environnement de base de données : ${databaseEnv}`);

  const checkDatabaseCommand = `docker exec postgres psql -h localhost -U postgres -l | grep artbook | wc -l`;
  const databaseExists = execSync(checkDatabaseCommand, {
    stdio: "pipe",
    cwd: scriptDirectory,
    encoding: "utf-8",
  }).trim();

  if (databaseExists.toString() === "1") {
    const dropCommand = `yarn sequelize-cli db:drop --env ${databaseEnv}`;
    console.log(`Avant l'exécution de la commande : ${dropCommand}`);
    execSync(dropCommand, { stdio: "inherit", cwd: scriptDirectory });
    console.log(`Après l'exécution de la commande : ${dropCommand}`);
  } else {
    console.log(
      "La base de données n'existe pas, aucune suppression nécessaire."
    );
  }

  // Exécution de la commande db:create
  const createCommand = `yarn sequelize db:create --env ${databaseEnv}`;
  console.log(`Exécution de la commande : ${createCommand}`);
  execSync(createCommand, { stdio: "inherit", cwd: scriptDirectory });

  // Exécution de la commande db:migrate
  const migrateCommand = `yarn sequelize-cli db:migrate --env ${databaseEnv} --migrations-path=./db/migrations`;
  console.log(`Exécution de la commande : ${migrateCommand}`);
  execSync(migrateCommand, { stdio: "inherit", cwd: scriptDirectory });

  // Exécution de la commande db:seed:all
  const seedCommand = `yarn sequelize-cli db:seed:all --env ${databaseEnv} --seeders-path=./db/seeders`;
  console.log(`Exécution de la commande : ${seedCommand}`);
  execSync(seedCommand, { stdio: "inherit", cwd: scriptDirectory });

  console.log(`Initialisation de la base de données ${databaseEnv} terminée.`);
} catch (error) {
  console.error(
    `Erreur lors de l'initialisation de la base de données:`,
    error
  );
  process.exit(1);
}
