# Guía de Configuración - Task Tracker

## Configuración de MongoDB Atlas

### 1. Crear cuenta en MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Selecciona el plan **M0 Free** (gratis para siempre)

### 2. Crear un Cluster

1. Haz clic en "Build a Database"
2. Selecciona **M0 Free** (Shared)
3. Elige una región cercana a ti
4. Nombra tu cluster (ej: "task-tracker-cluster")
5. Haz clic en "Create"

### 3. Configurar Seguridad

#### Crear Usuario de Base de Datos:
1. Ve a "Database Access" en el menú lateral
2. Haz clic en "Add New Database User"
3. Selecciona "Password" como método de autenticación
4. Crea un usuario y contraseña (guárdalos en un lugar seguro)
5. En "Database User Privileges", selecciona "Atlas admin" o "Read and write to any database"
6. Haz clic en "Add User"

#### Configurar IP Whitelist:
1. Ve a "Network Access" en el menú lateral
2. Haz clic en "Add IP Address"
3. Para desarrollo, puedes usar `0.0.0.0/0` (permite desde cualquier IP)
   - ⚠️ **Nota**: Esto es solo para desarrollo. En producción, usa IPs específicas.
4. Haz clic en "Confirm"

### 4. Obtener Connection String

1. Ve a "Database" en el menú lateral
2. Haz clic en "Connect" en tu cluster
3. Selecciona "Connect your application"
4. Copia la connection string (se ve así: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
5. Reemplaza `<username>` con tu usuario
6. Reemplaza `<password>` con tu contraseña
7. Agrega el nombre de la base de datos al final: `...mongodb.net/tasktracker?retryWrites=true&w=majority`

### 5. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
PORT=3000
```

**⚠️ IMPORTANTE**: Nunca subas el archivo `.env` a Git. Ya está incluido en `.gitignore`.

## Despliegue en Render

### 1. Preparar el Repositorio

1. Sube tu código a GitHub
2. Asegúrate de que `.env` esté en `.gitignore`

### 2. Crear Servicio en Render

1. Ve a [Render](https://render.com)
2. Crea una cuenta (puedes usar GitHub para login)
3. Haz clic en "New +" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Selecciona el repositorio del proyecto

### 3. Configurar el Servicio

- **Name**: `task-tracker` (o el nombre que prefieras)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### 4. Configurar Variables de Entorno

En la sección "Environment Variables", agrega:

- **Key**: `MONGODB_URI`
- **Value**: Tu connection string de MongoDB Atlas (la misma que usaste en `.env`)

**Nota**: Render asigna automáticamente la variable `PORT`, no necesitas configurarla.

### 5. Desplegar

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. Espera a que termine el build (puede tomar 2-5 minutos)
4. Tu aplicación estará disponible en: `https://tu-app.onrender.com`

### 6. Actualizar Frontend (Opcional)

Si quieres que el frontend use la URL de producción, puedes:

1. Actualizar `API_URL` en `index.html` para usar una variable de entorno
2. O crear un archivo de configuración que detecte el entorno

## Alternativas de Despliegue

### Railway

1. Ve a [Railway](https://railway.app)
2. Conecta tu repositorio de GitHub
3. Railway detecta automáticamente Node.js
4. Agrega la variable de entorno `MONGODB_URI`
5. Despliega

### Vercel

1. Ve a [Vercel](https://vercel.com)
2. Conecta tu repositorio
3. Configura como proyecto Node.js
4. Agrega variables de entorno
5. Despliega

## Solución de Problemas

### Error de conexión a MongoDB

- Verifica que la IP whitelist incluya `0.0.0.0/0` o la IP de Render
- Verifica que el usuario y contraseña sean correctos
- Verifica que la connection string esté correctamente formateada

### Error en Render

- Verifica los logs en el dashboard de Render
- Asegúrate de que `MONGODB_URI` esté configurada correctamente
- Verifica que el build command sea `npm install`

### Tests fallan

- Los tests unitarios pueden necesitar una base de datos de prueba separada
- Considera usar `mongodb-memory-server` para tests

## Recursos

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

