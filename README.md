# Vue.js CRUD Application

This project is a Vue.js 3 frontend that implements **CRUD** (Create, Read, Update, Delete) operations for Products and their associated Reviews, consuming a simulated API built with `json-server`.

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

Para executar o projeto, você precisará iniciar o servidor *backend* (API) e a aplicação *frontend*.

### 1. Backend (API Server - usando json-server)

O backend usa o json-server para criar uma API REST simulada a partir do arquivo db.json.

1.  *Navegue para o diretório do backend:*
    sh
    cd backend
    

2.  *Instale o json-server globalmente (caso ainda não o tenha):*
    sh
    npm install -g json-server
    # OU, se preferir instalar localmente: npm install json-server
    

3.  *Inicie o servidor da API:*
    sh
    json-server --watch db.json --port 3000
    
    > O servidor da API estará disponível em http://localhost:3000. Mantenha este terminal aberto.

### 2. Frontend (Vue.js Application)

1.  *Navegue para o diretório do frontend:*
    sh
    cd frontend
    

2.  *Instale as dependências do projeto:*
    sh
    npm install
    

3.  *Inicie o servidor de desenvolvimento:*
    sh
    npm run dev
    
    > O aplicativo Vue.js estará rodando no endereço exibido no seu terminal (geralmente http://localhost:5173).

---

### Environment Configuration

O frontend utiliza um arquivo .env para definir a URL da API.

-   VITE_API_URL=http://localhost:3000

Se você executar o json-server em uma porta diferente, certifique-se de atualizar esta variável de ambiente de acordo.