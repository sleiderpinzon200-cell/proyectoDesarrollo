const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usuario = { name: 'daniel', password: '1234' };
let intentos = 0;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/iniciar', (req, res) => {
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
app.post('/iniciar', (req, res) => {
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




app.use((req, res) => {
    res.send('no se encontro la pagina');
});
app.listen(3000);
console.log(`Server is running on port 3000`);
