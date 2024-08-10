const express = require("express");
const app = express();
const port = 8000;

app.use(express.json()); // Habilita o parsing de JSON

// Base de dados (no exemplo, um array simples)
const livros = [
  {
    id: 1,
    titulo: "O Principe",
    autor: "Maquiavel",
    editora: "Saraiva",
    valor: 100,
    ano: 1532,
    quant: 10,
    preco: 90,
  },
  {
    id: 2,
    titulo: "A cabana",
    autor: "William P.Young",
    editora: "Sextante",
    valor: 89,
    ano: 2017,
    quant: 6,
    preco: 86,
  },
  {
    id: 3,
    titulo: "Programaco Python",
    autor: "Davis",
    editora: "Saraiva",
    valor: 76,
    ano: 2022,
    quant: 7,
    preco: 79,
  },
];

// Rotas da API
app.get("/livros", (req, res) => {
  res.json(livros);
});

app.get("/livros/:id", (req, res) => {
  const livro = livros.find((l) => l.id === parseInt(req.params.id));
  if (livro) {
    res.json(livro);
  } else {
    res.status(404).json({ error: "Livro não encontrado" });
  }
});

app.post("/livros", (req, res) => {
  const novoLivro = req.body;
  novoLivro.id = livros.length + 1; // Gerando ID automático
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put("/livros/:id", (req, res) => {
  const index = livros.findIndex((l) => l.id === parseInt(req.params.id));
  if (index !== -1) {
    livros[index] = { ...livros[index], ...req.body };
    res.json(livros[index]);
  } else {
    res.status(404).json({ error: "Livro não encontrado" });
  }
});

app.delete("/livros/:id", (req, res) => {
  const index = livros.findIndex((l) => l.id === parseInt(req.params.id));
  if (index !== -1) {
    livros.splice(index, 1);
    res.json({ message: "Livro deletado com sucesso" });
  } else {
    res.status(404).json({ error: "Livro não encontrado" });
  }
});

// Buscar livros por editora
app.get("/livros/editora/:editora", (req, res) => {
  const editora = req.params.editora;
  const livrosEditora = livros.filter(
    (l) => l.editora.toLowerCase() === editora.toLowerCase(),
  );
  res.json(livrosEditora);
});

// Buscar livros por palavra-chave no título
app.get("/livros/titulo/:palavraChave", (req, res) => {
  const palavraChave = req.params.palavraChave;
  const livrosEncontrados = livros.filter((l) =>
    l.titulo.toLowerCase().includes(palavraChave.toLowerCase()),
  );
  res.json(livrosEncontrados);
});

// Buscar livros acima de um determinado valor
app.get("/livros/valor/acima/:valor", (req, res) => {
  const valor = parseFloat(req.params.valor);
  const livrosAcimaValor = livros.filter((l) => l.valor > valor);
  res.json(livrosAcimaValor);
});

// Buscar livros abaixo de um determinado valor
app.get("/livros/valor/abaixo/:valor", (req, res) => {
  const valor = parseFloat(req.params.valor);
  const livrosAbaixoValor = livros.filter((l) => l.valor < valor);
  res.json(livrosAbaixoValor);
});

// Buscar livros mais recentes
app.get("/livros/recentes", (req, res) => {
  const livrosRecentes = [...livros].sort((a, b) => b.ano - a.ano);
  res.json(livrosRecentes);
});

// Buscar livros mais antigos
app.get("/livros/antigos", (req, res) => {
  const livrosAntigos = [...livros].sort((a, b) => a.ano - b.ano);
  res.json(livrosAntigos);
});

// Buscar livros sem estoque
app.get("/livros/semEstoque", (req, res) => {
  const livrosSemEstoque = livros.filter((l) => l.quant === 0);
  res.json(livrosSemEstoque);
});

// Buscar livros acima de um determinado preço
app.get("/livros/preco/acima/:preco", (req, res) => {
  const preco = parseFloat(req.params.preco);
  const livrosAcimaPreco = livros.filter((l) => l.preco > preco);
  res.json(livrosAcimaPreco);
});

// Buscar livros abaixo de um determinado preço
app.get("/livros/preco/abaixo/:preco", (req, res) => {
  const preco = parseFloat(req.params.preco);
  const livrosAbaixoPreco = livros.filter((l) => l.preco < preco);
  res.json(livrosAbaixoPreco);
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

app.listen(port, () => {
  console.log(`Livraria API listening at http://localhost:${port}`);
});
