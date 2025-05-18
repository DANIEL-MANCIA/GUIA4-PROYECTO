const express = require('express');
const router = express.Router();
const db = require('../db');

// GET todos los libros con nombre de autor
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT l.*, a.nombre || ' ' || a.apellido as autor_nombre
      FROM libros l
      JOIN autores a ON l.id_autor = a.id
      ORDER BY l.titulo
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

// POST crear libro
router.post('/', async (req, res) => {
  const { titulo, id_autor, isbn, fecha_publicacion } = req.body;

  if (!titulo || !id_autor) {
    return res.status(400).json({ error: 'Título y autor son requeridos' });
  }

  try {
    const result = await db.query(
      `INSERT INTO libros (titulo, id_autor, isbn, fecha_publicacion)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [titulo, id_autor, isbn, fecha_publicacion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ error: 'Error al crear libro' });
  }
});

// PUT actualizar libro
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, id_autor, isbn, fecha_publicacion } = req.body;

  try {
    const result = await db.query(
      `UPDATE libros 
       SET titulo = $1, id_autor = $2, isbn = $3, fecha_publicacion = $4
       WHERE id = $5 RETURNING *`,
      [titulo, id_autor, isbn, fecha_publicacion, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    res.status(500).json({ error: 'Error al actualizar libro' });
  }
});

// DELETE eliminar libro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM libros WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).json({ error: 'Error al eliminar libro' });
  }
});

module.exports = router;