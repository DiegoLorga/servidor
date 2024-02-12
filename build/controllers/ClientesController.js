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
exports.clientesController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class ClientesController {
    addCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO cliente set ?", [req.body]);
            console.log(resp);
            res.json(resp);
            //res.json(null);
        });
    }
    showCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM cliente');
            res.json(respuesta);
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM cliente WHERE ID_Cliente = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Cliente no encontrada' });
        });
    }
    eliminarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM cliente WHERE ID_Cliente = ${id}`);
            res.json(resp);
        });
    }
    actualizarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE cliente set ? WHERE ID_Cliente = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    obtenerReservacionesPorCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            console.log("Nombre:", nombre);
            try {
                const query = yield database_1.default.query(`
                    SELECT c.Nombre, c.Apellido,r.ID_Reservacion, r.FechaInicio, r.FechaFin
                    FROM cliente c JOIN reservaciones r ON 
                    c.ID_Cliente = r.ID_Cliente WHERE c.Nombre = ?`, [nombre]);
                // Manejar los resultados de la consulta...
                res.json(query);
            }
            catch (error) {
                console.error("Error al obtener reservaciones:", error);
                res.status(500).json({ error: "Error al obtener reservaciones" });
            }
        });
    }
    obtenerPagosPorCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            console.log("Nombre:", nombre);
            try {
                const query = yield database_1.default.query(`
                    SELECT c.Nombre AS Nombre_Cliente, co.*, r.*
                    FROM cliente c
                    JOIN reservaciones r ON c.ID_Cliente = r.ID_Cliente
                    JOIN cobros co ON r.ID_Reservacion = co.idReservacion
                    WHERE c.Nombre = ?`, [nombre]);
                // Manejar los resultados de la consulta...
                res.json(query);
            }
            catch (error) {
                console.error("Error al obtener reservaciones:", error);
                res.status(500).json({ error: "Error al obtener reservaciones" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, password1 } = req.body;
            try {
                // Ejecutar la consulta SQL para determinar el tipo de usuario y obtener el ID del cliente
                const query = yield database_1.default.query(`
                    SELECT IFNULL(
                        (SELECT IF(tipo = 'usuario', 'User', 'Admin') AS tipo_usuario
                         FROM cliente 
                         WHERE Email = ? AND password1 = ?),
                         -1) AS tipo_usuario,
                         (SELECT ID_Cliente FROM cliente WHERE Email = ? AND password1 = ?) AS ID_Cliente`, [Email, password1, Email, password1]);
                // Extraer el tipo de usuario y el ID del cliente del resultado de la consulta
                const tipoUsuario = query[0].tipo_usuario;
                const idCliente = query[0].ID_Cliente;
                // Devolver el tipo de usuario y el ID del cliente en la respuesta
                res.json({ tipo_usuario: tipoUsuario, id_cliente: idCliente });
            }
            catch (error) {
                console.error("Error al buscar el cliente:", error);
                res.status(500).json({ tipo_usuario: -1, id_cliente: null, error: 'Error al buscar el cliente' });
            }
        });
    }
}
exports.clientesController = new ClientesController();
