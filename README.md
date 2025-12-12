# Task Tracker

Aplicación web simple para gestionar tareas (to-do) con backend HTTP y base de datos MongoDB.

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

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Editar `.env` y configurar `MONGODB_URI`:
   - Para desarrollo local: `mongodb://localhost:27017/tasktracker`
   - Para MongoDB Atlas: usar la connection string de tu cluster

## Configuración de MongoDB Atlas (Recomendado)

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito (M0)
3. Crear un usuario de base de datos
4. Configurar IP whitelist (0.0.0.0/0 para desarrollo)
5. Obtener la connection string
6. Reemplazar `<password>` y `<dbname>` en la connection string
7. Agregar la connection string a `.env` como `MONGODB_URI`

## Ejecución

### Desarrollo
```bash
npm start
```

### Tests
```bash
npm test
```

## Despliegue

### Render (Recomendado)

1. Crear cuenta en [Render](https://render.com)
2. Conectar tu repositorio de GitHub
3. Crear un nuevo Web Service
4. Configurar:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: tu connection string de MongoDB Atlas
     - `PORT`: Render lo asigna automáticamente
5. Desplegar

### Alternativas

- **Railway**: Similar a Render, también gratuito
- **Vercel**: Para frontend + serverless functions
- **Heroku**: Tiene tier gratuito limitado

## Estructura del Proyecto

```
├── config/
│   └── database.js          # Configuración de MongoDB
├── models/
│   └── Task.js              # Modelo de Task (Mongoose)
├── routes/
│   └── tasks.js             # Rutas de la API
├── services/
│   ├── taskService.js       # Lógica de negocio
│   └── taskService.test.js  # Tests unitarios
├── api.test.js              # Tests de integración
├── server.js                # Servidor Express
└── index.html               # Frontend

```

## API Endpoints

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener una tarea por ID
- `POST /api/tasks` - Crear una nueva tarea
- `PATCH /api/tasks/:id` - Cambiar estado de completado

## Licencia

ISC

