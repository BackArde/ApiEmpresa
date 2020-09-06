const router = require('express').Router();

const { check, validationResult } = require('express-validator');

const { getAll, create, getById, remove, update } = require('../../models/departamento')

router.get('/', async (req, res) => {
    try {
        const departamentos = await getAll();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', [
    check('nombre', 'Campo nombre obligatorio').exists(),
    check('ciudad', 'Campo ciudad obligatorio').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    }
    try {
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoDepartamento = await getById(result['insertId']);
            res.status(201).json({ sucess: 'Nuevo departamento añadido', departamento: nuevoDepartamento });
        } else {
            res.status(422).json({ error: 'No se ha podido añadir el nuevo departamento' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.delete('/', async (req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Departamento borrado, gente al paro' });
        } else {
            res.status(422).json({ error: `No se ha podido borrar el departamento = ${req.body.id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); //
    }
});


router.put('/', async (req, res) => {
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Departamento actualizado, Gracias' });
        } else {
            res.status(422).json({ error: 'Departamento no actualizado, comprueba el ID, por favor' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
