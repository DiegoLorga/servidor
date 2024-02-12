"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservacionesController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class ReservacionesController {
    ValidarReserva(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //const parametros = req.body;
            const { ID_Cabana } = req.params;
            const { FechaInicio } = req.params;
            const { FechaFin } = req.params;
            try {
                const result = yield database_1.default.query(`
                SELECT CASE
                WHEN EXISTS (
                SELECT c.ID_cabana
                FROM reservaciones r
                INNER JOIN cabana c ON r.ID_Cabana = c.ID_Cabana
                WHERE c.ID_Cabana = ${ID_Cabana}
                  AND (
                    ('${FechaInicio}' <= r.FechaInicio AND '${FechaInicio}' <= r.FechaInicio)
                    OR ('${FechaInicio}' >= r.FechaFin AND '${FechaInicio}' >= r.FechaFin)
                  ) 
                  ) THEN 1
                ELSE 0
                END AS resultado
                `, [ID_Cabana, FechaInicio, FechaFin]);
                const resultadoConsulta = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.resultado; // Asumiendo que la columna se llama id_cabana
                if (resultadoConsulta === 0) {
                    console.log(resultadoConsulta);
                }
                res.json(result);
            }
            catch (error) {
                console.error('Error al verificar la superposición:', error);
                // return false;
            }
        });
    }
    addReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID_Cabana, ID_Cliente, FechaInicio, FechaFin } = req.body;
            try {
                // Insertar la reserva
                const result = yield database_1.default.query("INSERT INTO reservaciones (ID_Cabana, ID_Cliente, FechaInicio, FechaFin) VALUES (?, ?, ?, ?)", [ID_Cabana, ID_Cliente, FechaInicio, FechaFin]);
                const ID_reservacion = result.insertId;
                // Consultar el monto total a cobrar
                const respCobro = yield database_1.default.query(`
                SELECT 
                    (DATEDIFF(r.FechaFin, r.FechaInicio) + 1) * c.PrecioPorNoche AS monto_total
                FROM 
                    reservaciones r
                JOIN 
                    cabana c ON r.ID_Cabana = c.ID_Cabana
                WHERE 
                    r.ID_Reservacion = ?;
            `, [ID_reservacion]);
                // Extraer el monto total de la respuesta
                const montoTotal = respCobro[0].monto_total;
                // Insertar el cobro en la tabla cobros
                const respReservacion = yield database_1.default.query("INSERT INTO cobros (IdReservacion, MontoCobrado) VALUES (?, ?)", [ID_reservacion, montoTotal]);
                res.json({ message: 'Reserva agregada exitosamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al agregar la reserva' });
            }
        });
    }
    showReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM reservaciones');
            res.json(respuesta);
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM reservaciones WHERE ID_Reservacion = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Reservacion no encontrada' });
        });
    }
    eliminarReservacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM reservaciones WHERE ID_Reservacion = ${id}`);
            res.json(resp);
        });
    }
    actualizarReservacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE reservaciones set ? WHERE ID_Reservacion = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    PrecioReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCabana, fechaInicio, fechaFin } = req.params;
            if (!idCabana || !fechaInicio || !fechaFin) {
                res.status(400).json({ message: 'Se requieren los parámetros idCabana, fechaInicio y fechaFin' });
                return;
            }
            const sqlQuery = `
                INSERT INTO cobros (IdReservacion, MontoCobrado)
                SELECT r.ID_Reservacion, c.PrecioPorNoche * DATEDIFF(?, ?) AS total_a_pagar
                FROM reservaciones r
                JOIN cabana c ON r.ID_Cabana = c.ID_Cabana
                WHERE r.ID_Cabana = ?;`;
            try {
                const resp = yield database_1.default.query(sqlQuery, [fechaFin, fechaInicio, idCabana]);
                console.log(resp);
                res.json(resp);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al realizar la consulta' });
            }
        });
    }
}
exports.reservacionesController = new ReservacionesController();
