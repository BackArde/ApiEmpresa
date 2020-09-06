const router = require('express').Router();

const apiEmpleadosRouter = require('./api/empleados');
const apiDepartamentosRouter = require('./api/departamentos');

router.use('/empleados', apiEmpleadosRouter);
router.use('/departamentos', apiDepartamentosRouter);

module.exports = router;
