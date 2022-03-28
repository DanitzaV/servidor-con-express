const express = require('express');
const path = require('path');
let Contenedor = require('./manejo-de-archivos.js');

const aplicacion = express();

let controlador = new Contenedor("productos.txt") 

const servidor = aplicacion.listen(8080, () => {
    console.log("servidor corriendo en puerto " + 8080);
})

servidor.on("error", (err) => {
    console.log("error", err);
})

aplicacion.get("/", (resquest, res) => {
    res.send("<h1>Bienvenido</h1><p>Para ver el contenido del archivo productos.txt, ingrese a la ruta /productos</p><p>Para obtener un producto random, ingrese a la ruta /productoRandom</p>");
})

 aplicacion.get('/productos', (req, res) => {
    controlador.getAll().then(data => {
        res.send(data);
    })
    
});

aplicacion.get('/productoRandom', (req, res) => {
    controlador.getById(Math.floor(Math.random() * 3) + 1).then(response => {
        res.send(response);
    })
});