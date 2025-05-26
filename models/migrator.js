import { resolve } from "node:path";
import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";
import { ServiceError } from "infra/errors.js";

async function initializeMigrations({ dryRun = true }) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: dryRun,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    return { dbClient, defaultMigrationOptions };
  } catch (error) {
    await dbClient?.end();
    throw new ServiceError({
      cause: error,
      message: "Error while initializing migrations",
    });
  }
}

async function listPendingMigrations() {
  const { dbClient, defaultMigrationOptions } = await initializeMigrations({});

  try {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    return pendingMigrations;
  } catch (error) {
    throw new ServiceError({
      cause: error,
      message: "Failed to list pending migrations",
    });
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  const { dbClient, defaultMigrationOptions } = await initializeMigrations({
    dryRun: false,
  });

  try {
    const migratedMigrations = await migrationRunner(defaultMigrationOptions);

    return migratedMigrations;
  } catch (error) {
    throw new ServiceError({
      cause: error,
      message: "Failed to execute pending migrations",
    });
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
