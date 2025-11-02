# 🧠 TaskPulse — Backend Demo App

## 🚀 Project functions and assumptions

✅ **NestJS** -> nodejs backend framework

✅ **Prisma** -> ORM for PostgreSQL

✅ **Docker Composer** -> containerize databases

✅ **BullMQ** -> queues

✅ **EventEmitter + Cron jobs** -> event responses and automatic tasks

✅ **JWT Auth + bcrypt** -> login support and user authorization

## 🧱 Installation and configuration

### Clone the repository
```bash
  git clone https://github.com/your-username/taskpulse.git
  cd taskpulse
```

### Dependency installation
```bash
  npm i -g pnpm
  pnpm install
```

### Start the database (Postgres + Redis)
```bash
  docker-compose up -d
```

### Setup the .env file
```bash
  cp .env.example .env
```

### Database initialization
```bash
  npx prisma migrate dev --name init
```

### Prisma Client Generation
```bash
  npx prisma generate
```

### Graphical preview of the Prisma database in a browser
```bash
  npx prisma studio
```

### Launch the application
```bash
  pnpm start:dev
```

### App works on:
http://localhost:3000