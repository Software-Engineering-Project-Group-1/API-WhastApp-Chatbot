const express = require('express');
const sessionRoutes = require('./routes/session');
require('./whatsapp/client'); // Esto arranca el cliente de WhatsApp

const app = express();

app.use(express.json());
app.use('/api/session', sessionRoutes); // Ruta para ver estado o reiniciar, opcional

module.exports = app;
