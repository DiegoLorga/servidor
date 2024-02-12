"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CabanaController_1 = require("../controllers/CabanaController");
class cabanaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/crearcabana/', CabanaController_1.cabanaController.createCabana);
        this.router.get('/MostrarTodasCabanas/', CabanaController_1.cabanaController.mostrar_todas_cabanas);
        this.router.get('/listOne/:id', CabanaController_1.cabanaController.listOne);
        this.router.delete('/eliminarCabana/:id', CabanaController_1.cabanaController.eliminarCabana);
        this.router.put('/actualizarCabana/:id', CabanaController_1.cabanaController.actualizarCabana);
    }
}
const cabanasRoutes = new cabanaRoutes();
exports.default = cabanasRoutes.router;
