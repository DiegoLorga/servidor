"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CobrosController_1 = require("../controllers/CobrosController");
class cobrosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/addCobro/', CobrosController_1.cobroController.addCobro);
        this.router.get('/showCobros/', CobrosController_1.cobroController.showCobros);
        this.router.get('/showOne/:id', CobrosController_1.cobroController.showOne);
        this.router.get('/reporteventas/:fechaInicial/:fechaFinal', CobrosController_1.cobroController.reporteventas);
    }
}
const cobroRoutes = new cobrosRoutes();
exports.default = cobroRoutes.router;
