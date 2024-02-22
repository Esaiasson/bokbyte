const isProduction = process.env.NODE_ENV === "production";

const DATABASE_URL = isProduction
  ? process.env.DATABASE_URL
  : "clients_tracker";

const SSL_CONFIG = isProduction ? { rejectUnauthorized: false } : false;

const db = new Client({
  connectionString: DATABASE_URL,
  ssl: SSL_CONFIG,
});

db.connect();