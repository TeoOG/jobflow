# JobFlow

JobFlow is a full-stack job application tracker that allows users to create, view, update, and delete job applications through a simple web interface.

Built as a full-stack project using Vue, Node.js, Express, and PostgreSQL.

## Tech Stack

**Frontend**
- Vue 3
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express
- REST API

**Database**
- PostgreSQL

## Features

- Add job applications
- View existing applications
- Update application status
- Delete applications
- Persistent PostgreSQL storage
- Responsive user interface

Application statuses: `Applied`, `Interview`, `Rejected`, `Offer`

## Architecture

```text
Browser
   |
   v
Vue 3 / Vite
   |
   | HTTP / JSON
   v
Express REST API
   |
   | SQL
   v
PostgreSQL
```

The Vue frontend communicates with the Express backend using HTTP requests. Express handles the REST API and communicates with PostgreSQL using the `pg` package.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all applications |
| POST | `/api/jobs` | Create an application |
| PATCH | `/api/jobs/:id` | Update application status |
| DELETE | `/api/jobs/:id` | Delete an application |

## Running Locally

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=jobflow
PORT=3000
```

Start the backend:

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend development server runs on port `5173` and communicates with the API on port `3000`.

## Future Improvements

- User authentication
- Input validation and error handling
- Job search and matching
- Application analytics
- Automated testing
- Production deployment with Nginx and HTTPS