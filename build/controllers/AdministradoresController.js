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
exports.administradorController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class AdministradoresController {
    addAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO administradores set ?", [req.body]);
            console.log(resp);
            res.json(resp);
            //res.json(null);
        });
    }
    showAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM administradores');
            res.json(respuesta);
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM administradores WHERE ID_Admin = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Cuenta no encontrada' });
        });
    }
    eliminarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM administradores WHERE ID_Admin = ${id}`);
            res.json(resp);
        });
    }
    actualizarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE administradores set ? WHERE ID_Admin = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    ValidarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const parametros = req.body;
            var consulta = `SELECT ID_Admin, Usuario FROM administradores WHERE Usuario = '${parametros.Usuario}' AND Contrasena = '${parametros.contrasena}'`;
            const resp = yield database_1.default.query(consulta);
            if (resp.length > 0)
                res.json(resp);
            else
                res.json({ "id_Rol": "-1" });
            //res.json(null);
            //console.log(consulta);
        });
    }
}
exports.administradorController = new AdministradoresController();
