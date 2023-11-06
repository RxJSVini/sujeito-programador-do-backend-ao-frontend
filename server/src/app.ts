import { fastify } from 'fastify';
import { routesApp  } from './routes';

export const app = fastify({
    logger: true
});

app.register(routesApp);