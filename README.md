# URL Shortener

A full-stack URL shortening application built with Node.js, Express, React, and PostgreSQL. Containerised with Docker.

## What it does

- Paste a long URL and get a short link back
- Visiting the short link redirects you to the original URL
- All URLs are permanently stored in a PostgreSQL database

## Tech Stack

**Frontend:** React, TailwindCSS, Vite

**Backend:** Node.js, Express, CORS

**Database:** PostgreSQL

**DevOps:** Docker

## Running locally

### Prerequisites
- Node.js v18+
- PostgreSQL
- Docker (optional)

### 1. Clone the repo
```bash
git clone https://github.com/Darragh-Tammaro/URL-shortener.git
cd URL-shortener
```

### 2. Set up the database
Open your PostgreSQL shell and run:
```sql
CREATE DATABASE urlshortener;
\c urlshortener

CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Set up environment variables
Create a `.env` file in the root of the project:

~~~
DB_HOST=localhost
DB_PORT=5432
DB_NAME=urlshortener
DB_USER=postgres
DB_PASSWORD=your_password_here
~~~

### 4. Install dependencies and start the backend
```bash
npm install
npm run dev
```

### 5. Install dependencies and start the frontend
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Running with Docker

Build the image:
```bash
docker build -t url-shortener .
```

Run the container:
```bash
docker run -p 3000:3000 --env-file .env url-shortener
```

Note: requires a running PostgreSQL instance accessible from the container.
