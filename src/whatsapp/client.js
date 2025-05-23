const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
require('dotenv').config();

// Número autorizado (formato WhatsApp Web)
const ALLOWED_CHAT_ID = '50683267976@c.us'; // Cambia esto por el número correcto

// Inicializa el cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

// Mostrar el código QR
client.on('qr', (qr) => {
  console.log('🟢 Escanea este código QR con WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Cliente listo
client.on('ready', () => {
  console.log('✅ Cliente de WhatsApp está listo!');
});

// Manejar mensajes
client.on('message', async (msg) => {
  if (msg.from !== ALLOWED_CHAT_ID) {
    //console.log(`⛔ Mensaje ignorado de ${msg.from}`);
    return;
  }

  console.log(`📥 Mensaje recibido de ${msg.from}: ${msg.body}`);

  try {
    // Enviar mensaje al chatbot
    const response = await axios.post("http://host.docker.internal:3000/api/chat", {
      message: msg.body
    });

    const reply = response.data.response || 'Lo siento, no pude generar una respuesta.';

    // Responder al usuario
    await msg.reply(reply);
  } catch (error) {
    console.error('❌ Error al consultar la API:', error.message);
    await msg.reply('Ups... hubo un problema al procesar tu mensaje 😥');
  }
});

client.initialize();

module.exports = client;
