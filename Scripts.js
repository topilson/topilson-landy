const express = require('express');
const app = express();
const port = 3000;

// Armazenar os endereços IP dos dispositivos que acessam o link
const ipAddresses = [];

// Middleware para obter o endereço IP do cliente e armazená-lo
app.use((req, res, next) => {
  const ipAddress = req.ip;
  ipAddresses.push(ipAddress);
  console.log('Novo dispositivo acessando o link. Endereço IP:', ipAddress);
  next();
});

// Rota para exibir a lista de endereços IP rastreados
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Endereços IP Rastreados</title>
    </head>
    <body>
      <h1>Endereços IP Rastreados:</h1>
      <ul>
        ${ipAddresses.map(ip => `<li>${ip}</li>`).join('')}
      </ul>
    </body>
    </html>
  `);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});