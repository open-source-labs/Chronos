"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getGrafanaDatasource() {
    // Fetch datasource information from grafana API.
    // This datasource is PRECONFIGURED on launch using grafana config.
    const datasourceResponse = await axios_1.default.get('http://localhost:32000/api/datasources');
    // Create a datasource object to be used within panels.
    const datasource = {
        type: datasourceResponse[0].type,
        uid: datasourceResponse[0].uid,
    };
    return datasource;
}
module.exports = getGrafanaDatasource;
//# sourceMappingURL=getDataSource.js.map