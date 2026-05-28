const express = require("express");
const app = express();

const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());


// =========================
// CONEXIÓN MYSQL LOCAL
// =========================

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "abc123",
    database: "sanmifood",
    port: 3306
});

db.connect(err => {

    if(err){

        console.log(err);

    }else{

        console.log("MySQL conectado");
    }
});


// =========================
// REGISTRO
// =========================

app.post("/registro", (req, res) => {

    const {

        nombre,
        telefono,
        direccion,
        correo,
        password

    } = req.body;

    const verificar = `
    
    SELECT * FROM usuarios
    
    WHERE correo = ?
    
    `;

    db.query(verificar, [correo], (err, result) => {

        if(err){

            console.log(err);

            return res.send("error");
        }

        if(result.length > 0){

            res.send("correo_existe");

        }else{

            const sql = `
            
            INSERT INTO usuarios
            (nombre, telefono, direccion, correo, password)

            VALUES (?, ?, ?, ?, ?)
            
            `;

            db.query(

                sql,

                [
                    nombre,
                    telefono,
                    direccion,
                    correo,
                    password
                ],

                (err, result) => {

                    if(err){

                        console.log(err);

                        res.send("error");

                    }else{

                        res.send("registro_ok");
                    }
                }
            );
        }
    });
});


// =========================
// LOGIN
// =========================

app.post("/login", (req, res) => {

    const {correo, password} = req.body;

    const sql = `
    
    SELECT * FROM usuarios
    
    WHERE correo = ?
    
    AND password = ?
    
    `;

    db.query(

        sql,

        [correo, password],

        (err, result) => {

            if(err){

                console.log(err);

                res.send("error");

            }else{

                if(result.length > 0){

                    res.json(result[0]);

                }else{

                    res.send("error");
                }
            }
        }
    );
});


// =========================
// AGREGAR AL CARRITO
// =========================

app.post("/carrito", (req, res) => {

    const {

        usuario_id,
        nombre_producto,
        precio,
        restaurante

    } = req.body;

    const sql = `
    
    INSERT INTO carrito
    (usuario_id, nombre_producto, precio, restaurante)

    VALUES (?, ?, ?, ?)
    
    `;

    db.query(

        sql,

        [
            usuario_id,
            nombre_producto,
            precio,
            restaurante
        ],

        (err, result) => {

            if(err){

                console.log(err);

                res.send("error");

            }else{

                res.send("producto_agregado");
            }
        }
    );
});


// =========================
// OBTENER CARRITO
// =========================

app.get("/carrito/:usuario_id", (req, res) => {

    const usuario_id = req.params.usuario_id;

    const sql = `
    
    SELECT * FROM carrito
    
    WHERE usuario_id = ?
    
    `;

    db.query(sql, [usuario_id], (err, result) => {

        if(err){

            console.log(err);

            res.send("error");

        }else{

            res.json(result);
        }
    });
});


// =========================
// ELIMINAR PRODUCTO
// =========================

app.delete("/carrito/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
    
    DELETE FROM carrito
    
    WHERE id = ?
    
    `;

    db.query(sql, [id], (err, result) => {

        if(err){

            console.log(err);

            res.send("error");

        }else{

            res.send("eliminado");
        }
    });
});


// =========================
// SERVIDOR LOCAL
// =========================

app.listen(3000, () => {

    console.log("Servidor corriendo en puerto 3000");
});
