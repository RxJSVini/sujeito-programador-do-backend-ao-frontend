import { FastifyInstance } from 'fastify';
import { CustomersController  } from '../controllers/customersController';

const customersController = new CustomersController();

export async function routesApp(app: FastifyInstance) {
    app.post('/customers', customersController.createCustomer.bind(customersController));
    app.get('/customers', customersController.getAllCustomers.bind(customersController));
    app.put('/customers/:id', customersController.updateCustomers.bind(customersController));
    app.delete('/customers/:id', customersController.deleteCustomers.bind(customersController));
}