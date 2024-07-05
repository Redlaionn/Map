const express = require('express');
const sql = require('mssql/msnodesqlv8');
const app = express();
const PORT = 4000;
const cors = require('cors');
// Configuración de la conexión a la base de datos SQL Server
const config = {
    database: 'DatosMap',
  server: 'DESKTOP-2GBF2HB\\SQLEXPRESS',  // Asegúrate de usar doble backslash (\\) en JS para escapar el backslash
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,  // Esto habilita la autenticación de Windows
    encrypt: false,           // Puede ser necesario ajustar esto dependiendo de tu entorno
    enableArithAbort: true
  }
};

const corsOptions = {
    origin: 'http://localhost:3000', // Permite solo solicitudes de este origen
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) requieren esto
  };

app.use(cors(corsOptions));
// Conectar a la base de datos


let pool;

// Conectar a la base de datos
sql.connect(config).then(p => {
  pool = p;
  console.log('Conectado a SQL Server');
}).catch(err => {
  console.error('Error al conectar a SQL Server:', err);
  process.exit(1);
});

app.get('/datos', async (req, res) => {
  try {
    const result = await pool.request()
      .query('SELECT latitud, longitud, name, marca, modelo, desmarca,desmodelo FROM DatosMap m join marca ma on ma.codmarca = m.marca join modelo mo on mo.codmodelo = m.modelo');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error al obtener datos: ' + err.message);
  }
});

// Ruta de API para obtener modelos
app.get('/datos/marcas', async (req, res) => {
  const { filter } = req.query;

  let query = 'SELECT DISTINCT codMarca id, DesMarca descripcion FROM Marca';
  if (filter) {
      query += ` WHERE DesMarca LIKE '%${filter}%'`;
  }

  try {
      const result = await pool.request().query(query);
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send('Error al obtener datos: ' + err.message);
  }
});

// Endpoint para obtener modelos
app.get('/datos/modelos', async (req, res) => {
  const { filter } = req.query;

  let query = 'SELECT DISTINCT codModelo id, DesModelo descripcion FROM Modelo';
  if (filter) {
      query += ` WHERE DesModelo LIKE '%${filter}%'`;
  }

  try {
      const result = await pool.request().query(query);
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send('Error al obtener datos: ' + err.message);
  }
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
