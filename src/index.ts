import { AddressInfo } from 'net';
import http from 'http';
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { createServer } from './config/express';
import swaggerDocument from '../swaggerDoc';

// initialize configuration
dotenv.config();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

async function startServer() {
  const app = createServer();
  // app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(docs));
  app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log( `Server ready at http://${addressInfo.address}:${addressInfo.port}`);
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.info(`process.once ${type}`);

      server.close(() => {
        console.debug('HTTP server closed');
      });
    });
  });
}

startServer();