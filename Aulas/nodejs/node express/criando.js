// //importando e inicializando o express(npm install express)
const express = require('express');
const app = express();
const port = 3000;

// Rota para a página inicial
app.get('/', (req, res) => {
res.send('<h1>Página inicial</h1>');
});

// Rota para a página sobre
app.get('/sobre', (req, res) => {
res.send('<h1>Página sobre</h1>');
});

// // Rota para a página de contato
app.get('/contato', (req, res) => {
res.send('<h1>Página de contato</h1>');
});

// // Configurando o servidor para ouvir na porta especificada
app.listen(port, () => {
   console.log(`Servidor rodando em http://localhost:${port}`);
});