const express = require('express');
const cors = require('cors');

const empleadosRoutes = require('./routes/empleados');
const clientesRoutes = require('./routes/clientes');
const autoresRoutes = require('./routes/autores');
const librosRoutes = require('./routes/libros');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use('/empleados', empleadosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/autores', autoresRoutes);
app.use('/libros', librosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  console.log('\nEndpoints disponibles:');
  console.log(`- Empleados: http://localhost:${PORT}/empleados`);
  console.log(`- Clientes: http://localhost:${PORT}/clientes`);
  console.log(`- Autores: http://localhost:${PORT}/autores`);
  console.log(`- Libros: http://localhost:${PORT}/libros`);
});

