# Altran BackEnd Assessmen

## Instrucciones para levantar el proyecto

El proyecto cuenta con un entorno virtual realizado con Docker. 
El entorno se puede levantar de 2 maneras diferentes, con Docker o instalando los paquetes necesarios en su entorno de desarrollo.

## Instrucciones para levantar el proyecto con Docker

### Requisitos 

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) Docker >= 17.05.0
- [Docker Compose](https://docs.docker.com/compose/) Docker-Compose >= 1.8.0

### Desarrollo

1. Situarse dentro de la carpeta del proyecto y ejecutar el comando `docker-compose up --build`. Este comando instalará todos los paquetes necesarios dentro del contenedor y dejara el servidor listo para ser utilizado
2. Abrir en el navegador http://localhost:9000/
3. Para ingresar al contenedor`docker exec -it (nombre del contenedor) bash`

## Instrucciones para levantar el proyecto en el entorno local

### Requisitos 

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 6.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [Nodemon](https://nodemon.io/) (`npm install --global nodemon`)

### Desarrollo

1. Ejecutar `npm install` para instalar las dependencias del servidor.
2. Ejecutar `npm run start_dev` para levantar el servidor en modo desarrollo.
3. Abrir en el navegador http://localhost:9000/

## Suposiciones
1. El resultado de la union se guarda en un nuevo archivo y se devuelve en un JSON
2. Se da prioridad al enunciado y no al ejemplo, el contenido del fichero 1 se agraga al final del contenido del fichero 2
3. Si el fichero 1 tiene contenido repetido en si mismo pero este no se encuentra en el fichero 2, este pasa completo en la union
4. Se remplazo queryString por URL Amigable

## EndPoints

* Swagger: En la ruta http://localhost:9000/ tiene toda la documentación de las apis.

* La API cuenta con una validacion API-KEY, sin esta no se puede acceder al EndPoint

### /api/merge/{file_1}/{file_2} - Método que permite unir el contenido inexistente del fichero_1 al fichero_2 y enlazarlo al final.

**Request**
``` 
/api/merge/file_1/file_2
``` 

**Response (code 200)**
``` 
{
  "message": "New file \"file_2_file_1.md\" has been created",
  "text_file": "Hola yo soy el fichero 2\nA ver si puedo explicar que soy\nHola yo soy el fichero 1"
}
``` 

**Response (code 404)**
``` 
{
  "message": "File file_2 not Found",
  "err": "Error: Error: ENOENT: no such file or directory, open '/usr/src/app/built/config/../../files/file_.md'"
}
```

**Response (code 401)**
``` 
{
  "status": 401,
  "message": "Invalid API Key"
}
```

## Testing

* Ejecutar `npm test` esto ejecuta los test con Mocha y Chai.
* Ejecutar `npm run test:watch` esto ejecuta los test con Mocha y Chai y se quedará mirando los cambios de los archivos y correrá los test automáticamente.

## Frameworks y Librerias
### Framework
"express": "^4.13.4"

### Task Manager
"gulp": "^3.9.1"

### Utils
"lodash": "^4.17.4"
"babel-eslint": "^8.0.0"
"gulp-eslint": "^4.0.0"

### Documentation
"swagger-jsdoc": "^1.9.6"
"swagger-ui-express": "^2.0.1"

### Transpilers
"babel": "^6.23.0"
"babel-preset-es2015": "^6.24.1"
"babel-preset-es2016": "^6.24.1"
"gulp-babel": "^6.1.2"

### Test
"mocha": "^3.5.3"
"chai": "^4.1.2"
"supertest": "^3.0.0"
