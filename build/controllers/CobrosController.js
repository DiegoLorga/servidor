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
exports.cobroController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class CobrosController {
    addCobro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO cobros set ?", [req.body]);
            console.log(resp);
            res.json(resp);
            //res.json(null);
        });
    }
    showCobros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM cobros');
            res.json(respuesta);
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM cobros WHERE IdCobro = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Dato no encontrada' });
        });
    }
    reporteventas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fechaInicial, fechaFinal } = req.params; // Suponiendo que envías las fechas inicial y final en el cuerpo de la solicitud
            const respuesta = yield database_1.default.query(' SELECT SUM(MontoCobrado) AS ganancias_totales FROM cobros WHERE Fecha_Cobro >= ? AND Fecha_Cobro <= ?', [fechaInicial, fechaFinal]);
            console.log("fecha inicial:", fechaInicial, "fecha final:", fechaFinal);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'No se encontraron datos' });
        });
    }
}
exports.cobroController = new CobrosController();
