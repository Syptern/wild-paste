import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";
import fs from "fs";

// Determine which .env file to load (if any)
const environment = process.env.NODE_ENV || "development";
const envFile = `.env.${environment}`;

// Load the environment file if it exists
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config(); // fallback to .env
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
