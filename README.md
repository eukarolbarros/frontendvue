# Vue.js CRUD Application

This project is a Vue.js 3 frontend that implements CRUD operations for Products and their associated Reviews, consuming a simulated API built with `json-server`.

## Project Structure

```
.
├── backend/
│   └── db.json         # API data source
└── frontend/
    ├── src/
    │   ├── components/ # Vue components
    │   ├── services/   # API communication layer
    │   ├── App.vue
    │   └── main.js
    ├── .env            # Environment variables
    └── README.md       # This file
```

## Setup and Execution Instructions

### 1. Backend (API Server)

The backend uses `json-server` to create a mock REST API.

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install json-server globally (if you haven't already):**
    ```sh
    npm install -g json-server
    ```

3.  **Start the API server:**
    ```sh
    json-server --watch db.json --port 3000
    ```
    The API will be available at `http://localhost:3000`.

### 2. Frontend (Vue.js Application)

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install project dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be running at the address shown in your terminal (usually `http://localhost:5173`).

### Environment Configuration

The frontend uses a `.env` file to define the API URL. This file will be created automatically.

-   `VITE_API_URL=http://localhost:3000`

If you run the `json-server` on a different port, make sure to update this variable accordingly.
