const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { getAll, create, getById, remove, update } = require('../../models/empleado');


router.get('/', (req, res) => {
    getAll() 
        .then(rows => { 
            res.json(rows)
        })
        .catch(error => { 
            res.status(500).json({ error: error.message }); 
        });
});


// Insertamos empleados con POST
router.post('/', [
    check('nombre', 'Nombre obligatorio').exists(),
    check('dni', 'Dni obligatorio').exists(),
    check('dni', 'Dni solo puede ser numérico').isNumeric(),
    check('dni', 'Dni debe tener mas de 6 digitos').isLength({ min: 6 }),
    check('sexo', 'Sexo  obligatorio').exists(),
    check('fecha_nac', 'Fecha de nacimiento  obligatoria').exists(),
    check('salario', 'Salario  obligatorio').exists(),
    check('cargo', 'Cargo  obligatorio').exists(),
    check('fk_departamento', 'Departamento  obligatorio').exists(),
    check('jefe_id', 'Jefe obligatorio').exists()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    }
    try {
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoEmpleado = await getById(result['insertId']);
            res.status(201).json({ sucess: 'Se ha insertado un nuevo empleado', empleado: nuevoEmpleado });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el empleado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.delete('/', async (req, res) => {
   try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {  
            res.json({ success: 'Se ha borrado el empleado' });
        } else {
            res.status(422).json({ error: `No se ha podido borrar el empleado ID = ${req.body.id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


router.put('/', async (req, res) => {
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha actualizado el empleado' });
        } else {
            res.status(422).json({ error: 'No se ha podido actualizar el empleado. Comprueba el ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
