// routes/empleados.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /empleados
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM empleados ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error.message);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

// POST /empleados
router.post('/', async (req, res) => {
  const { id, nombre, cargo } = req.body;

  if (!id || !nombre || !cargo) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const result = await db.query(
      'INSERT INTO empleados (id, nombre, cargo) VALUES ($1, $2, $3) RETURNING *',
      [id, nombre, cargo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar empleado:', error.message);
    res.status(500).json({ error: 'Error al insertar empleado' });
  }
});

// PUT /empleados/:id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, cargo } = req.body;

  if (!nombre || !cargo) {
    return res.status(400).json({ error: 'Nombre y cargo requeridos' });
  }

  try {
    const result = await db.query(
      'UPDATE empleados SET nombre = $1, cargo = $2 WHERE id = $3 RETURNING *',
      [nombre, cargo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar empleado:', error.message);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
});

// DELETE /empleados/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await db.query(
      'DELETE FROM empleados WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar empleado:', error.message);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
});

module.exports = router;
