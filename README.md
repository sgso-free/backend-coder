# Desafios Backend-Course
## Desafio-18
### Configuracion
- Para poder iniciar el proyecto se debe clonar o descargar el repositorio
git clone https://github.com/sgso-free/backend-coder
- A continuacion, ya descargado ejecutar los siguiente comando desde la carpeta "Desarrollo-Backend"
git checkout desafio-18
npm install
- Revisar ".env"
PORT=8080
NODE_ENV=local
NODE_BASE= //Tipo de persistencia de datos que quieras utilizar: "memoria|json|mongodb|firestore"

- Revisar ".conf"
//Estos datos son los datos de configuracion para conectarse a mongodb
MONGO_URL=mongodb://localhost:27017/ecommerce

//Estos datos son los datos de configuracion para conectarse a firebase deben copiarse al archivo conf 
// const config = { 
        firebase: {
                firebaseConfig : //credenciales firebase
        }
    }
 
- Por ultimo ejecutar los comandos 
npm start 