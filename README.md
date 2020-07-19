# TeachersApp

The Teacher's App makes it easy for teachers to share lessons plans, worksheets, and other documents as well as connect with each other. Teachers can follow their peers, and upload useful files for themselves and others to use. Teachers App is just for teachers, no intrusion of administrators and parents allows for a focused, collaborative environment across the net.

# Development

TeachersApp is a monorepo with both `client` and `server` services. References will be made to each of these sub projects.

## Built with

| Library      | Purpose                 |
| ------------ | ----------------------- |
| AWS          | S3 upload and download  |
| express      | API middleware          |
| graphql      | Query language for API  |
| redis        | in memory cache         |
| typeorm      | Postgres ORM            |
| React        | frontend library        |
| React Router | routing                 |
| Axios        | ajax calls              |
| Apollo       | GraphQL client          |
| Formik       | forms                   |
| MaterialUI   | bootstrapped components |

## Git Branches

master: Deployent to hosted frontend and backend servers.
develop: Release candidate for pull requests into master. Features branches are branched from develop and are PR'd there when work is complete
feature branches: Work related to incoming tickets are done here. When local testing is passed, these branches are PR'd into develop

## Usage

`/server`
| Command | Purpose |
| ------------ | ----------------------- |
| npm run test | Initiate tests |
| npm run start | Build and start server |
| npm run dev | Build and start server locally with hot reload |

`/client`
|Commnad | Purpose |
|-----|-----|
|npm run test | Initiate tests|
|npm run build | Build files for deployment|
|npm run start| Start application |

## Production Deployment

Backend - Deployed to Heroku with the Redis and Postgres add-ons

Frontend - Deployed to Netlify

# Authors

- [Schuyler Sossa](https://github.com/ssousa33)
- [Justin Lundy](https://github.com/julundy)
