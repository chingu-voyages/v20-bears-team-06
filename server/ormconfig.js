module.exports =
  process.env.APP_ENV === "production"
    ? {
        name: "default",
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        entities: ["src/entity/*.*"],
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : {
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "mypass",
        database: "typegraphql-example",
        logging: true,
        synchronize: true,
        entities: ["src/entity/*.*"],
      };
