const express = require('express');
const router = express.Router();

const usuario = require('../models/user');

let intentos = 0;

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/iniciar', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Iniciar sesión</h1>
                <form method="post" action="/iniciar">
                    <label>Nombre:<br><input type="text" name="name"></label><br><br>
                    <label>Contraseña:<br><input type="password" name="password"></label><br><br>
                    <button type="submit">Entrar</button>
                </form>
            </body>
        </html>
    `);
});

//validacion de datos
router.post('/iniciar', (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Faltan name o password en el formulario.');
    }

    if (intentos >= 3) {
        return res.status(403).send('Acceso denegado. Demasiados intentos.');
    }

    if (name === usuario.name && password === usuario.password) {
        intentos = 0;
        return res.send('Acceso con éxito. Usuario validado.');
    }

    intentos += 1;
    return res.status(401).send(`Credenciales inválidas. Intento ${intentos} de 3.`);
});

module.exports = router;