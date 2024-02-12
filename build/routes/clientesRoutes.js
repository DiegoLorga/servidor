"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientesController_1 = require("../controllers/ClientesController");
class clientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/addCliente/', ClientesController_1.clientesController.addCliente);
        this.router.get('/ShowCliente/', ClientesController_1.clientesController.showCliente);
        this.router.get('/showOne/:id', ClientesController_1.clientesController.showOne);
        this.router.put('/actualizarCliente/:id', ClientesController_1.clientesController.actualizarCliente);
        this.router.get('/obtenerReservacionesPorCliente/:nombre', ClientesController_1.clientesController.obtenerReservacionesPorCliente);
        this.router.get('/obtenerPagosPorCliente/:nombre', ClientesController_1.clientesController.obtenerPagosPorCliente);
        this.router.post('/login/', ClientesController_1.clientesController.login);
    }
}
const clienteRoutes = new clientesRoutes();
exports.default = clienteRoutes.router;
