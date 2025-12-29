# OmniWallet

OmniWallet is a modern fintech ecosystem featuring a cross-platform mobile application and a web-based dashboard. It enables users to manage digital payment instruments and execute peer-to-peer transactions seamlessly.

---

## 🏗 Project Structure

The project is organized into three main directories:
* `/app`: Mobile application (Flutter)
* `/client`: Web dashboard (Next.js)
* `/server`: Backend API (Node.js + Express + Prisma)

---

## 📱 App (Flutter – Mobile)

### Prerequisites
- Flutter SDK
- Android Studio / Xcode
- Chrome (for web testing)

### Setup
1.  Navigate to the app directory:
    ```bash
    cd app
    ```
2.  Install dependencies:
    ```bash
    flutter pub get
    ```
3.  Create a `.env` file in the `app` folder:
    ```env
    API_BASE_URL=[http://10.0.2.2:8080/api](http://10.0.2.2:8080/api)
    ```
4.  Run the app:
    ```bash
    flutter run
    ```

---

## 💻 Client (Next.js – Web)

### Prerequisites
- Node.js (v18+)
- npm

### Setup
1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

---

## ⚙️ Server (Node.js + Prisma + PostgreSQL)

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file:
    ```env
    DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/omniwallet
    PORT=8080
    JWT_SECRET=your_secret_key
    CORS_ORIGIN=http://localhost:3000
    ```
4.  Setup database schema:
    ```bash
    npx prisma db push
    ```
5.  Start the server:
    ```bash
    npm run start
    ```

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Mobile** | Flutter, Dart |
| **Web** | Next.js 14, Tailwind CSS, Shadcn UI, TanStack Query |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL, Prisma ORM |
| **State Management** | Redux Toolkit (Web), Provider (Mobile) |

---

## 📄 License
This project is licensed under the MIT License.
