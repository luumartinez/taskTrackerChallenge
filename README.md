# Task Tracker

Aplicación web simple para gestionar tareas (to-do) con backend HTTP y base de datos MongoDB.

🚀 **Demo en vivo:** [https://tasktrakertest.onrender.com/#](https://tasktrakertest.onrender.com/#)

## Características

- ✅ Crear tareas con validación (3-80 caracteres)
- ✅ Ver lista de tareas
- ✅ Ver detalle de una tarea
- ✅ Marcar tareas como completadas/pendientes
- ✅ Persistencia en MongoDB
- ✅ Tests unitarios y de integración

## Tecnologías

- **Backend**: Node.js + Express
- **Base de datos**: MongoDB + Mongoose
- **Frontend**: HTML, CSS, JavaScript vanilla
- **Testing**: Jest + Supertest

---

## 🛠 Ejecución Local

Sigue estos pasos para ejecutar el backend, el frontend y los tests en tu máquina local.

### 1. Instalación

1. Clonar el repositorio:
   ```bash
   git clone LINK_A_TU_REPO
   cd task-tracker
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```

4. Editar `.env` con tu URI de MongoDB (Local o Atlas):
   ```env
   MONGODB_URI=mongodb://localhost:27017/tasktracker
   PORT=3000
   ```

### 2. Ejecutar Backend y Frontend

El servidor de Node.js se encarga de levantar la API y servir los archivos estáticos del frontend.

1. Iniciar el servidor:
   ```bash
   npm start
   ```

2. **Acceder al Frontend:**
   Abrir en el navegador: `http://localhost:3000`

### 3. Ejecutar Tests (Unit & API)

El proyecto incluye tests unitarios para la lógica de negocio y tests de integración para los endpoints.

**Correr todos los tests:**
```bash
npm test
```

---

## ☁️ Despliegue (Referencia)

Esta aplicación está configurada para desplegarse en **Render** con base de datos en **MongoDB Atlas**.

### Configuración en Render

1. Crear Web Service conectado al repositorio.
2. Comandos de construcción:
   - **Build**: `npm install`
   - **Start**: `npm start`
3. Variables de entorno requeridas:
   - `MONGODB_URI`: Connection string de Atlas.

## Estructura del Proyecto

```text
├── config/
│   └── database.js      # Configuración de MongoDB
├── models/
│   └── Task.js          # Modelo de Task (Mongoose)
├── routes/
│   └── tasks.js         # Rutas de la API
├── services/
│   ├── taskService.js       # Lógica de negocio
│   └── taskService.test.js  # ✅ Tests unitarios
├── api.test.js          # ✅ Tests de integración
├── server.js            # Servidor Express
└── index.html           # Frontend
```

## API Endpoints

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener una tarea por ID
- `POST /api/tasks` - Crear una nueva tarea
- `PATCH /api/tasks/:id` - Cambiar estado de completado

## Licencia

ISC