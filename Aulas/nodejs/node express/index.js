
const express = require('express');
const app = express();
const port = 3000;

// Função Middleware de aplicação para registrar o acesso a cada página (LOG)
app.use((req, res, next) => {
  console.log(`Acesso à página: ${req.url}`);
  next();
});

// Função Middleware de roteamento para a página inicial
app.get('/', (req, res) => {
  res.send('<h1>Página inicial</h1>');
});

// Função Middleware de roteamento para a página sobre
app.get('/sobre', (req, res) => {
  res.send('<h1>Página sobre</h1>');
});

// Função Middleware de roteamento para a página de contato
app.get('/contato', (req, res) => {
  res.send('<h1>Página de contato</h1>');
});

// Função Middleware de roteamento para a página de signin
app.get('/signin', (req, res, next) => {
  const userId = req.params.userid;
  if (userId) {
    res.send('<h1>Bem-vindo, usuário ${userId}!</h1>');
  } else {
    res.redirect('/signup');
  }
});

// Função Middleware de roteamento para a página de signup
app.get('/signup', (req, res) => {
  res.send('<h1>Página de cadastro</h1>');
});

// Função Middleware de roteamento para lidar com páginas não encontradas (erro 404)
app.use((req, res, next) => {
  res.status(404).send('<h1>Página não encontrada</h1><p><a href="/">Voltar para a página inicial</a></p>');
});

// Configurando o servidor para ouvir na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
