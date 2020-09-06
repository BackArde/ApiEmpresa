// Recuperamos empleados
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// Creamos un empleado
const create = ({ nombre, dni, sexo, fecha_nac, salario, cargo, fk_departamento, jefe_id }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO empleados (nombre, dni, sexo, fecha_nac, salario, cargo, fk_departamento, jefe_id) values(?,?,?,?,?,?,?,?)', [nombre, dni, sexo, fecha_nac, salario, cargo, fk_departamento, jefe_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


// Recuperamos empleados por ID
const getById = pEmpleado => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados WHERE id=?', [pEmpleado], (err, rows) => {
            if (err) return reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}


//Borramos empleados
const remove = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM empleados WHERE id = ?', [pEmpleadoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

//Actulaización de empleados
const update = ({ nombre, dni, sexo, fecha_nac, salario, cargo, fk_departamento, jefe_id, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE empleados SET nombre=?,dni=?,sexo=?,fecha_nac=?,salario=?,cargo=?,fk_departamento=?,jefe_id=? WHERE id=?', [nombre, dni, sexo, fecha_nac, salario, cargo, fk_departamento, jefe_id, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


module.exports = {
    getAll, create, getById, remove, update
}