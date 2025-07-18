"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const db_1 = __importDefault(require("./db"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/", apiRoutes_1.default);
app.listen(PORT, () => {
    console.log(`server is starting : http//:localhost${PORT} `);
    (0, db_1.default)();
});
