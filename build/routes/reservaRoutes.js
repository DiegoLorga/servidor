"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReservasController_1 = require("../controllers/ReservasController");
class reservaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.get('/ValidarReserva/:id/:FechaInicio/:FechaFin', ReservasController_1.reservasController.showOne);
    }
}
const reservasRoutes = new reservaRoutes();
exports.default = reservasRoutes.router;
