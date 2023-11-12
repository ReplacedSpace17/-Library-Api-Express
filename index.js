const express = require('express');
const connection = require('./SQL_CONECTION');
const app = express();
const port = 3000;
const cors = require('cors'); // Importa el middleware CORS
app.use(cors()); // Habilita el middleware CORS
app.use(express.json());



////////////////////////////////////////////////////////////////////////////////////////// IMPORTS FUNCTIONS

const { AddNewLibro, GetAllLibros, AddNewAutor, GetAllAutores, GetLibroById } = require('./functionsLibrary');

// Ruta para agregar un nuevo libro
app.post('/api/libros/add', async (req, res) => {
  const data = req.body;
  AddNewLibro(req, res, data);
});

// Ruta para obtener todos los libros con sus autores
app.get('/api/libros', async (req, res) => {
  GetAllLibros(req, res);
});

// Ruta para consultar un libro por ID
app.get('/api/libros/:id', async (req, res) => {
  const libroId = req.params.id;
  GetLibroById(req, res, libroId);
});


// Ruta para agregar un nuevo autor
app.post('/api/autores/add', async (req, res) => {
  const data = req.body;
  AddNewAutor(req, res, data);
});


// Ruta para obtener todos los autores con sus libros
app.get('/api/autores', async (req, res) => {
  GetAllAutores(req, res);
});


// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
  console.log("enro");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);

});
