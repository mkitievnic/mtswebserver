const express = require('express');
const cors = require('cors');
const { connectionDB } = require('../database/config');

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        /* this.pathUsers = '/api/users';
        this.pathAuth = '/api/auth'; */
        this.path = {
            users: '/api/users',
            auth: '/api/auth',
            product: '/api/product',
            category: '/api/category',
            search: '/api/search'
        }
        //cafeDB connecting
        this.conectarCafeDB();
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
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.users, require('../routes/users'));
        this.app.use(this.path.product, require('../routes/product'));
        this.app.use(this.path.category, require('../routes/categories'));
        this.app.use(this.path.search, require('../routes/search'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${this.port}`)
        })
    }
    async conectarCafeDB() {
        await connectionDB();
    }
}

module.exports = Server;