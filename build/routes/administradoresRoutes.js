"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdministradoresController_1 = require("../controllers/AdministradoresController");
class administradorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/addAdmin/', AdministradoresController_1.administradorController.addAdmin);
        this.router.get('/showAdmin/', AdministradoresController_1.administradorController.showAdmin);
        this.router.get('/showOne/:id', AdministradoresController_1.administradorController.showOne);
        this.router.delete('/eliminarAdmin/:id', AdministradoresController_1.administradorController.eliminarAdmin);
        this.router.put('/actualizarAdmin/:id', AdministradoresController_1.administradorController.actualizarAdmin);
        this.router.post('/ValidarAdmin/', AdministradoresController_1.administradorController.ValidarAdmin);
    }
}
const administradoRoutes = new administradorRoutes();
exports.default = administradoRoutes.router;
