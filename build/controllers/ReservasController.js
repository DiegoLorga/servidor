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
exports.reservasController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class ReservasController {
    ValidarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametros = req.body;
            // Consulta para verificar si la reserva ya existe
            const consultaReserva = `
            SELECT CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM Reservas
                    WHERE ID_Cabana = ${parametros.ID_Cabana}
                      AND FechaInicio = '${parametros.FechaInicio}'
                      AND FechaFin = '${parametros.FechaFin}'
                )
                THEN 1
                ELSE 0
            END AS ExisteReserva;
        `;
            try {
                // Ejecutar la consulta de validación de reserva
                const resultadoReserva = yield database_1.default.query(consultaReserva);
                // Verificar el resultado y enviar la respuesta
                if (resultadoReserva[0].ExisteReserva === 1) {
                    res.json({ "ExisteReserva": 1 });
                }
                else {
                    res.json({ "NoExisteReserva": 0 });
                }
            }
            catch (error) {
                console.error("Error al validar reserva:", error);
                res.status(500).json({ "error": "Error al validar reserva" });
            }
        });
    }
    addImagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO imagenes set ?", [req.body]);
            console.log(resp);
            res.json(resp);
            //res.json(null);
        });
    }
    showImagenes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM imagenes');
            res.json(respuesta);
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM imagenes WHERE IdImagen = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Imagen no encontrada' });
        });
    }
    eliminarImagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM imagenes WHERE IdImagen = ${id}`);
            res.json(resp);
        });
    }
    actualizarImagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE imagenes set ? WHERE IdImagen = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
}
exports.reservasController = new ReservasController();
