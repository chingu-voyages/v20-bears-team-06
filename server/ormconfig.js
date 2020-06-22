const dbUrl = process.env.DB_URL;

module.exports = {
  name: "default",
  type: "postgres",
  url: dbUrl,
  logging: true,
  synchronize: true,
  entities: ["src/entity/*.*"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};