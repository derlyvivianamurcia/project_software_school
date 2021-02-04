const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');
const routesC = require('./routes/routesC');
const routesS = require('./routes/routesS');

require('dotenv').config();

//Ajustes
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', routes);
app.use('/apic', routesC);
app.use('/apiS', routesS)
app.get('/', (req, res) => {
	res.send('Hola!, conexión a base de datos software geek');
});

//Ajustes del servidor
app.listen(app.get('port'), () => {
	console.log(`servidor corriendo en el puerto ${app.get('port')}`);
});
