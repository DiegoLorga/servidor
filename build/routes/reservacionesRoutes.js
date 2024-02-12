"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReservacionesController_1 = require("../controllers/ReservacionesController");
class reservacionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.get('/ValidarReserva/:ID_Cabana/:FechaInicio/:FechaFin', ReservacionesController_1.reservacionesController.ValidarReserva);
        this.router.post('/addReserva/', ReservacionesController_1.reservacionesController.addReserva);
        this.router.get('/Mostrar_reservaciones/', ReservacionesController_1.reservacionesController.showReservas);
        this.router.get('/showOne/:id', ReservacionesController_1.reservacionesController.showOne);
        this.router.delete('/eliminarReservacion/:id', ReservacionesController_1.reservacionesController.eliminarReservacion);
        this.router.put('/actualizarReservacion/:id', ReservacionesController_1.reservacionesController.actualizarReservacion);
    }
}
const reservacionRoutes = new reservacionesRoutes();
exports.default = reservacionRoutes.router;
