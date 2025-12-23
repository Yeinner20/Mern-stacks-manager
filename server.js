const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app =  express();  //forzando el arranque

// Middlewares (Permiten leer JSON y conexiones externas)
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (Usaremos una local por ahora para facilitar)
const URI = process.env.MONGO_URI || 'mongodb://localhost/mern-tasks';

mongoose.connect(URI)
    .then(() => console.log('✅ Base de Datos Conectada'))
    .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/tasks', require('./routes/tasks'));


// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
