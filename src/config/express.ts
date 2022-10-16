import express from 'express';
import { UserRouter } from '../routes';

const createServer = (): express.Application => {

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // adding routes of the applicaiton
  app.use('/user', UserRouter);

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });

  return app;
};

export { createServer };