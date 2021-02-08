import Login from '../../../frontend/Frontend/colegio-geek-software/src/components/Login'

const { Router } = require('express');
const routerCuenta = Router();

const cuentaController = require('../controllers/controllerCuentas');

//Crud para cuentas.
routerCuenta.get('/cuenta', cuentaController.listCuentas);
routerCuenta.get('/cuenta/:id', cuentaController.getCuenta);
routerCuenta.post('/cuenta', cuentaController.addCuenta);
routerCuenta.put('/cuenta/:id', cuentaController.updateCuenta);
routerCuenta.delete('/cuenta/:id', cuentaController.deleteCuenta);

function Routes() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/menu" component={Menu}/>
        </Switch>
      </BrowserRouter>
    );
  }
  
  export default routesLog;

module.exports = routerCuenta;

