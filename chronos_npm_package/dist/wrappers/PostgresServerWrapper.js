// import { Client } from 'pg';
// import grpc from '@grpc/grpc-js';
import pkg from 'pg';
const { Client } = pkg;
async function connect(URI) {
    try {
        const SQLclient = new Client({ connectionString: URI });
        await SQLclient.connect();
        console.log(`Connected to database at ${URI.slice(0, 24)}...`);
        await SQLclient.query(`
      CREATE TABLE IF NOT EXISTS communications(
        _id serial PRIMARY KEY,
        microservice VARCHAR(248) NOT NULL,
        request VARCHAR(32) NOT NULL,
        responsestatus INTEGER,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        correlatingId VARCHAR(500)
      )
    `);
        return SQLclient;
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL DB:', error.message);
        throw error;
    }
}
function wrapMethods(server, metadataHolder, methods, userConfig, SQLclient) {
    const keys = Object.keys(methods);
    const wrappedMethods = {};
    for (const name of keys) {
        wrappedMethods[name] = (call, callback) => {
            metadataHolder.metadata = call.metadata;
            methods[name](call, async (error, response) => {
                try {
                    const queryString = `
            INSERT INTO grpc_communications (microservice, request, correlatingId)
            VALUES ($1, $2, $3)`;
                    const microservice = userConfig.microservice;
                    const request = name;
                    const correlatingId = metadataHolder.metadata.get('id')?.[0] || 'unknown_id';
                    const values = [microservice, request, correlatingId];
                    await SQLclient.query(queryString, values);
                    console.log('Request cycle saved');
                }
                catch (err) {
                    console.error('Error saving request cycle:', err.message);
                }
                callback(error, response);
            });
        };
    }
    return wrappedMethods;
}
class ServerWrapper {
    constructor(server, proto, methods, userConfig) {
        this.metadataHolder = {};
        connect(userConfig.database.URI)
            .then((SQLclient) => {
            this.SQLclient = SQLclient;
            const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig, this.SQLclient);
            server.addService(proto, wrappedMethods);
        })
            .catch((error) => {
            console.error('Failed to initialize SQL client:', error.message);
        });
    }
}
export default ServerWrapper;
//# sourceMappingURL=PostgresServerWrapper.js.map