const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.pathUsers = '/api/users';
        //middlewares
        this.middlewares()
        //routes
        this.routes();

    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.pathUsers, require('../routes/users'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${this.port}`)
        })
    }
}

module.exports = Server;