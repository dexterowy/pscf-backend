# SmartDoors

---

## Requirements

- node.js 16
- docker
- @nestjs/cli (optional for generating new files)

## Installation

1. Build and install containers

```
docker-compose up
```

In Docker image there is PGAdmin on `localhost:5050` and PostgreSQL on `localhost:5432`.  
Database has connected volume: `db` directory.

2. Install all dependencies

```
npm install
```

3. Apply migration using prisma

```
npx prisma migrate dev
```

4. Generate types for @prisma/client based on scheme. **You have to run that command every time you change scheme**

```
npx prisma generate
```

## Start

Start backend in hot-reload mode available at `localhost:8000`

```
npm run start:dev
```

For manual operations on database use prisma web-app

```
npx prisma studio
```

### Swagger

While the application is running, open your browser and navigate to http://localhost:8000/api. You should see the Swagger UI.
