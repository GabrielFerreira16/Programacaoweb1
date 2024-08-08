const express = require('express');
const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello');
})

app.get('/v2/:name', function(req, res) {
  res.json({msg: 'hello, ' + req.params.name});
 })

app.get('/v3/:lang/:name', function(req, res) {
  const lang = req.params.lang;
  const messages ={
    'pt-br': 'Olá!',
    'en': 'Hello!',
    'es': 'Hola!',
  };
  
  if (lang in messages){
    res.json({msg: messages[req.params.lang] + ', ' + req.params.name});
  } else{
    res.status(404).json({error: 'Idioma não encontrado'});
  }
   });

app.use(function(req, res, next){
  res.status(404).json({error: 'Endpoint não encontrado'});
})