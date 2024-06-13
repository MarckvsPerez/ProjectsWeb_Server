# API REST para Mi Web Personal de Proyectos

Esta es la API REST para la gestión de los proyectos en mi web personal. Proporciona endpoints para crear, leer, actualizar y eliminar proyectos.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)

## Introducción

Esta API REST permite la gestión de proyectos en mi web personal. Puedes usarla para agregar nuevos proyectos, obtener detalles de los proyectos existentes, actualizar información de proyectos y eliminar proyectos que ya no sean relevantes.

## Características

- Crear, leer, actualizar y eliminar proyectos.
- Filtrar proyectos por diferentes criterios.
- Paginación y ordenación de resultados.
- Autenticación basada en tokens.

## Instalación

Para instalar y ejecutar esta API localmente, sigue estos pasos:

1. Clona este repositorio:

    ```bash
    git clone https://github.com/MarckvsPerez/ProjectsWeb_Server
    cd ProjectsWeb_Server
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

    ```env
    DB_USER = user
    DB_PASSWORD = pass
    DB_HOST = "url.cluster.com"

    API_VERSION = v1
    IP_SERVER = localhost
    PORT = 3397

    JWT_SECRET_KEY = yourSecretKey
    JWT_ACCES_HOUR = 16
    JWT_REFRESH_MONTH = 1
    ```

4. Inicia el servidor:

    ```bash
    npm run dev
    ```

## Uso

Puedes interactuar con la API usando herramientas como `curl`, `Postman` o cualquier cliente HTTP.

