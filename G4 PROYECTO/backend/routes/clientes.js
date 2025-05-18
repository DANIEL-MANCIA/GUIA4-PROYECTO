// routes/clientes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /clientes
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clientes ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error.message);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// POST /clientes
router.post('/', async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email requeridos' });
  }

  try {
    const result = await db.query(
      'INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING *',
      [nombre, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar cliente:', error.message);
    res.status(500).json({ error: 'Error al insertar cliente' });
  }
});

// PUT /clientes/:id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email requeridos' });
  }

  try {
    const result = await db.query(
      'UPDATE clientes SET nombre = $1, email = $2 WHERE id = $3 RETURNING *',
      [nombre, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar cliente:', error.message);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// DELETE /clientes/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await db.query(
      'DELETE FROM clientes WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.sendStatus(204); // Sin contenido
  } catch (error) {
  console.error('Error al insertar cliente:', error); // 👈 muestra error completo
  res.status(500).json({ error: error.message });
}

});

module.exports = router;
