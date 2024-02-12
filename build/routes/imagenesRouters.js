"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImagenesController_1 = require("../controllers/ImagenesController");
class imagenesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/anadirImagen/', ImagenesController_1.imagenesController.addImagen);
        this.router.get('/mostrar_imagenes/', ImagenesController_1.imagenesController.showImagenes);
        this.router.get('/showOne/:id', ImagenesController_1.imagenesController.showOne);
        this.router.delete('/eliminarImagen/:id', ImagenesController_1.imagenesController.eliminarImagen);
        this.router.put('/actualizarCabana/:id', ImagenesController_1.imagenesController.actualizarImagen);
    }
}
const imagenRoutes = new imagenesRoutes();
exports.default = imagenRoutes.router;
