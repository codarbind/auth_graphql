## Installation

1. Start and ensure that your Docker Desktop is running.
2. Update your `.env` file using the `.env.example` template.
3. Run `docker-compose up -d`.
4. Run `npm install`.
5. Run `npx prisma migrate dev --name init`

## Running the app

```bash
# Watch mode
$ npm run start:dev
```

## Test

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```
