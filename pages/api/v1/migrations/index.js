import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

export default router.handler(controller.errorHandlers);

router.get(getMigrationsHandle).post(postMigrationsHandle);

async function getMigrationsHandle(request, response) {
  const { dbClient, defaultMigrationOptions } = await initializeMigrations({});

  const pendingMigrations = await migrationRunner(defaultMigrationOptions);
  await dbClient?.end();
  return response.status(200).json(pendingMigrations);
}

async function postMigrationsHandle(request, response) {
  const { dbClient, defaultMigrationOptions } = await initializeMigrations({
    dryRun: false,
  });

  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
  });

  await dbClient.end();
  if (migratedMigrations.length > 0) {
    return response.status(201).json(migratedMigrations);
  }

  return response.status(200).json(migratedMigrations);
}
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
  }
}
