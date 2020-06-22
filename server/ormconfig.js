const dbUrl =
  process.env.DB_URL ||
  "postgresql:mypass@postgres//localhost:5432/typegraphql-example";

module.exports = {
  name: "default",
  type: "postgres",
  url: dbUrl,
  logging: true,
  synchronize: true,
  entities: ["src/entity/*.*"],
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
};
