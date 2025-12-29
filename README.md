# OmniWallet – Project Setup

## App (Flutter – Mobile)

### Prerequisites
- Flutter SDK
- Android Studio / Xcode
- Chrome (for web testing)

### Setup
```bash
cd app
flutter pub get
Create .env file:
API_BASE_URL=http://10.0.2.2:8080/api
Run app:
flutter run
Client (Next.js – Web)
Prerequisites
Node.js (v18+)
npm
Setup
cd client
npm install
Create .env.local:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
Run development server:
npm run dev
Server (Node.js + Express + Prisma + PostgreSQL)
Prerequisites
Node.js (v18+)
PostgreSQL
Setup
cd server
npm install
Create .env file:
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/omniwallet
PORT=8080
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
Setup database:
npx prisma db push
Start server:
npm run start
