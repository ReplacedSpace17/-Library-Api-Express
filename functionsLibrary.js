const connection = require('./SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}


// Importa las dependencias necesarias y configura la conexión a la base de datos


  async function AddNewLibro(req, res, data) {
    const script = 'INSERT INTO book (title, chapters, pages, price, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    try {
      const result = await connection.query(script, [
        data.title,
        data.chapters,
        data.pages,
        data.price,
        data.author_id
      ]);
      const libroId = result.rows[0].id;
      console.log('📕 Nuevo libro agregado con ID: ' + libroId);
      res.status(201).json({ mensaje: 'Libro agregado', libroId });
    } catch (error) {
      console.error('Error al agregar libro', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
  

  async function GetAllLibros(req, res) {
    const script = 'SELECT book.*, author.name as author_name FROM book JOIN author ON book.author_id = author.id';
    try {
      const result = await connection.query(script);
      const libros = result.rows;
      res.status(200).json(libros);
    } catch (error) {
      console.error('Error al obtener libros', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
  
  // Otros endpoints se pueden seguir de manera similar
  async function GetLibroById(req, res, libroId) {
    const script = 'SELECT book.*, author.name as author_name FROM book JOIN author ON book.author_id = author.id WHERE book.id = $1';
    try {
      const result = await connection.query(script, [libroId]);
      const libro = result.rows[0];
      if (libro) {
        res.status(200).json(libro);
      } else {
        res.status(404).json({ error: 'Libro no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener libro por ID', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }

  async function AddNewAutor(req, res, data) {
    const script = 'INSERT INTO author (name) VALUES ($1) RETURNING id';
    try {
      const result = await connection.query(script, [data.name]);
      const autorId = result.rows[0].id;
      console.log('Nuevo autor agregado con ID: ' + autorId);
      res.status(201).json({ mensaje: 'Autor agregado', autorId });
    } catch (error) {
      console.error('Error al agregar autor', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }

  
  async function GetAllAutores(req, res) {
    const script = 'SELECT author.*, json_agg(json_build_object(\'id\', book.id, \'title\', book.title, \'chapters\', book.chapters, \'pages\', book.pages, \'price\', book.price)) as book FROM author LEFT JOIN book ON author.id = book.author_id GROUP BY author.id';
    try {
      const result = await connection.query(script);
      const autores = result.rows;
      res.status(200).json(autores);
    } catch (error) {
      console.error('Error al obtener autores', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }


module.exports = {
    AddNewLibro, GetAllLibros, AddNewAutor, GetAllAutores, GetLibroById
}