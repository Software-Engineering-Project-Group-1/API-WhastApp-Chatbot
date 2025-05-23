const express = require('express');
const router = express.Router();
const { client } = require('../whatsapp/client');

// Verifica si el cliente de WhatsApp está listo
router.get('/status', (req, res) => {
  if (client && client.info) {
    return res.json({
      estado: 'conectado',
      numero: client.info.wid.user
    });
  } else {
    return res.json({ estado: 'desconectado' });
  }
});

module.exports = router;
