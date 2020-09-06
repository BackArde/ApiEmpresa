//Obtenemos  todos los departamentos
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamento', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}


// Creamos departamentos
const create = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO departamento (nombre, ciudad) values(?,?)', [nombre, ciudad], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

//Editamos un departamento
const update = ({ nombre, ciudad, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE departamento SET nombre=?,ciudad=? WHERE id=?', [nombre, ciudad, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


// Recuperamos un departamento por ID
const getById = pDepartamento => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamento WHERE id=?', [pDepartamento], (err, rows) => {
            if (err) return reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}


//Borramos Departamentos.
const remove = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM departamento WHERE id = ?', [pDepartamentoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


module.exports = {
    getAll, create, getById, update, remove
}