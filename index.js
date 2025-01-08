const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear ser de express
const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors());

// Dir public
app.use(express.static('public'));

//Lectura y parseo del body
app.use( express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

//escuchar
app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});