const express = require('express');
const router = express.Router();
const db = require('../db');

// GET todos los autores
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM autores ORDER BY nombre, apellido');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener autores:', error);
    res.status(500).json({ error: 'Error al obtener autores' });
  }
});

// POST crear autor
router.post('/', async (req, res) => {
  const { nombre, apellido, nacionalidad, fecha_nacimiento } = req.body;

  if (!nombre || !apellido) {
    return res.status(400).json({ error: 'Nombre y apellido son requeridos' });
  }

  try {
    const result = await db.query(
      `INSERT INTO autores (nombre, apellido, nacionalidad, fecha_nacimiento)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, apellido, nacionalidad, fecha_nacimiento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear autor:', error);
    res.status(500).json({ error: 'Error al crear autor' });
  }
});

// PUT actualizar autor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, nacionalidad, fecha_nacimiento } = req.body;

  try {
    const result = await db.query(
      `UPDATE autores 
       SET nombre = $1, apellido = $2, nacionalidad = $3, fecha_nacimiento = $4
       WHERE id = $5 RETURNING *`,
      [nombre, apellido, nacionalidad, fecha_nacimiento, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar autor:', error);
    res.status(500).json({ error: 'Error al actualizar autor' });
  }
});

// DELETE eliminar autor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM autores WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar autor:', error);
    res.status(500).json({ error: 'Error al eliminar autor' });
  }
});

module.exports = router;