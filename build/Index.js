"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const cabanaRoutes_1 = __importDefault(require("./routes/cabanaRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const imagenesRoutes_1 = __importDefault(require("./routes/imagenesRoutes"));
const reservacionesRoutes_1 = __importDefault(require("./routes/reservacionesRoutes"));
const cobrosRoutes_1 = __importDefault(require("./routes/cobrosRoutes"));
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const administradoresRoutes_1 = __importDefault(require("./routes/administradoresRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 80);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/cabanas', cabanaRoutes_1.default);
        this.app.use('/api/imagenes', imagenesRoutes_1.default);
        this.app.use('/api/reservas', reservacionesRoutes_1.default);
        this.app.use('/api/cobros', cobrosRoutes_1.default);
        this.app.use('/api/clientes', clientesRoutes_1.default);
        this.app.use('/api/admin', administradoresRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
