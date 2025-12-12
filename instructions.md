“Task Tracker” (Web + Backend + Tests)
Objetivo
Construir una aplicación web simple para gestionar tareas (“to-do”), con un backend HTTP y
una UI simple. Queremos ver especialmente pruebas de API.
Alcance
Una tarea tiene:
● id (string o number)
● title (string, requerido, 3–80 chars)
● completed (boolean, default false)
● createdAt (ISO string)
Backend (API REST)
Implementa estos endpoints:
1. POST /api/tasks
a. Body: { "title": "..." }
b. Crea tarea y responde 201 con la tarea completa.
c. Validaciones:
i. title requerido
ii. title trim (sin espacios a los lados)
iii. 3–80 chars
3. GET /api/tasks
a. Devuelve lista de tareas (array)
Persistencia: puede ser en memoria (array/map). Bonus si usas una base de datos.
Frontend (web)
Una página simple que permita:
● Ver lista de tareas (título + estado)
● Crear una tarea (input + botón)
● Bonus: Marcar como completada
Puede ser:
● Lenguaje: El que quieras
● No importa el diseño, solo la funcionalidad.
Pruebas requeridas
1) API tests
Escribe tests que validen al menos:
● POST /api/tasks crea tarea y devuelve 201
● Validación: POST /api/tasks sin title devuelve 400
2) Unit tests
Crea una pequeña capa de lógica testeable (por ejemplo taskService o validators) y
agrega unit tests para:
● validateTitle(title) (trim, length, required)
● createTask(title) (set defaults)