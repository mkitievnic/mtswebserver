const mongoose = require('mongoose');


const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONEXION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('BASE DE DATOS cafeDB conectada.');

    } catch (err) {
        console.log(err);
        throw new Error('Ocurrio un problema a conectarse a cafeDB');
    }
}

module.exports = {
    connectionDB
}