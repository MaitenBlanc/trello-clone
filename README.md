# 📋 Clone de Trello (Task Manager Full Stack)

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=flat&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat&logo=docker&logoColor=white)

Una aplicación web Full Stack inspirada en Trello para la gestión de tareas utilizando la metodología Kanban. Este proyecto implementa una arquitectura moderna basada en microservicios (Backend) y una SPA (Frontend), todo contenerizado con Docker.

## ✨ Características Principales

* **Gestión de Tableros:** Crear, visualizar y eliminar tableros de proyectos.
* **Listas y Tarjetas:** Creación dinámica de columnas (listas) y tareas (tarjetas).
* **Drag & Drop Fluido:** Funcionalidad completa para arrastrar y soltar tarjetas entre columnas usando `@hello-pangea/dnd`.
* **UI Personalizable:**
    * Selector de temas globales (Variables CSS + Tailwind).
    * **Algoritmo de Color Determinista:** Los bordes de los tableros y columnas generan un color único basado en su ID, asegurando consistencia visual sin persistencia extra en BD.
* **Feedback al Usuario:** Notificaciones toast para operaciones exitosas o errores.
* **Arquitectura Robusta:** Validación de datos en backend y manejo de excepciones.

## 🛠️ Tecnologías Utilizadas

### Backend ☕
* **Java 21 & Spring Boot 3:** API RESTful.
* **Spring Data MongoDB:** Interacción con base de datos NoSQL.
* **Maven:** Gestión de dependencias.
* **Docker:** Contenerización del servicio.

### Frontend ⚛️
* **React.js (Vite):** Biblioteca de UI.
* **Tailwind CSS:** Estilizado moderno y responsivo.
* **Axios:** Consumo de API.
* **React Toastify:** Notificaciones.
* **Hello Pangea DnD:** Librería para Drag and Drop accesible.

### Infraestructura 🐳
* **Docker Compose:** Orquestación de contenedores (App + Base de Datos).
* **MongoDB:** Base de datos persistente.

## 🚀 Instalación y Ejecución

### Opción A: Usando Docker (Recomendado)
Si tienes Docker instalado, puedes levantar todo el entorno con un solo comando.

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/MaitenBlanc/trello-clone.git
    cd copytrello
    ```

2.  Ejecuta Docker Compose:
    ```bash
    docker-compose up --build
    ```

3.  Accede a la aplicación:
    * Frontend: `http://localhost:5173`
    * Backend API: `http://localhost:8080`

### Opción B: Ejecución Manual

**Backend:**
1.  Asegúrate de tener una instancia de MongoDB corriendo en el puerto `27017`.
2.  Navega a la carpeta del backend.
3.  Ejecuta: `./mvnw spring-boot:run`

**Frontend:**
1.  Navega a la carpeta del frontend.
2.  Instala dependencias: `npm install`
3.  Inicia el servidor de desarrollo: `npm run dev`

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura limpia y modular:

```text
/
├── src/main/java/com/maiten/copytrello  # Backend (Spring Boot)
│   ├── config/       # Configuración CORS y Seguridad
│   ├── controller/   # Endpoints REST
│   ├── model/        # Entidades de MongoDB
│   ├── repository/   # Interfaces de Spring Data
│   └── service/      # Lógica de negocio
│
└── trello-front/src                     # Frontend (React)
    ├── components/   # Componentes reutilizables (Card, List, Navbar)
    ├── services/     # Comunicación con la API (Axios)
    ├── utils/        # Funciones auxiliares (Generador de colores)
    └── App.jsx       # Componente principal

```

# Autora
Desarrollado por Maitén Blanc - Full Stack Developer