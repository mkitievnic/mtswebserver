const { request, response } = require('express');

usuariosGet = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'respuesta get',
        id
    })
}
usuariosPost = (req = request, res) => {
    const { nro, nombre, apellido, edad, fono } = req.body;
    res.json({
        msg: 'respuesta post',
        nro,
        nombre,
        apellido,
        edad,
        fono
    })
}
usuariosPut = (req, res) => {
    res.json({
        msg: 'respuesta put'
    })
}
usuariosDelete = (req, res) => {
    res.json({
        msg: 'respuesta delete'
    })
}
usuariosPatch = (req, res) => {
    res.json({
        msg: 'respuesta patch'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}