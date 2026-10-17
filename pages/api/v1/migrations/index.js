import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(req, rep) {
  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: "true",
    migrationsTable: "pgmigrations",
  };

  if (req.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
    await dbClient.end();
    return rep.status(200).json(pendingMigrations);
  }

  if (req.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return rep.status(201).json(migratedMigrations);
    }

    return rep.status(200).json(migratedMigrations);
  }

  return reponse.status(405).end();
}
