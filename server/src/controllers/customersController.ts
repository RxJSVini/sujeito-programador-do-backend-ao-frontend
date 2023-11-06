import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomerServiceCreate } from '../services/createCustomersService';
import { CustomersGet } from '../services/getCustomersService';
import { CustomerProps } from '../interfaces/ICustomers';
import { CustomerEditService } from '../services/editCustomersService';


interface ICustomerId  {
    id: string;
}
export class CustomersController {
    private createCustomersService = new CustomerServiceCreate();
    private getCustomersService = new CustomersGet();
    private editCustomersService = new CustomerEditService();
    public async createCustomer(
        request: FastifyRequest, 
        reply: FastifyReply): Promise<CustomerProps | any > {

        try {

            const { name, email }: CustomerProps = request.body;

            if (!name || !email) {
                return reply.status(400).send({
                    status: 400,
                    message: 'O cadastro de clientes necessita do preenchimento dos campos name, email.'
                })

            }
            
           const customerAlredyExists =  await this.getCustomersService.getOneByEmail(email)
           if(customerAlredyExists){
                return reply.status(409).send({
                    message:'O cliente já existe na base.'
                });
           }
           const response = await this.createCustomersService.execute({ name, email });

           return response

        } catch (error) {
            console.error(error)
            throw new Error(error);
        }
    }


    public async getAllCustomers(
        request: FastifyRequest, 
        reply: FastifyReply ): Promise<CustomerProps[] | any > {

        try {

            const response = await this.getCustomersService.getAll();

            return response

        } catch (error) {
            console.error(error)
            throw new Error(error);
        }
    }


    public async updateCustomers(       
        request: FastifyRequest, 
        reply: FastifyReply)
    {
        try {
            const { id } = request.params as ICustomerId;

            const { name, email}: CustomerProps = request.body;
            if(!name || !email){
                return reply.status(400).send({
                    status: 400,
                    message: 'A atualização de clientes necessita do preenchimento dos campos name, email.'
                })
            }
            const customerToUpdate = await this.getCustomersService.getOneById(id);
            if (!customerToUpdate) {
                return reply.status(404).send({
                    status: 'error',
                    message: 'Cliente não encontrado.'
                });
            }
    
            const existingCustomerWithEmail = await this.getCustomersService.getOneByEmail(email);
            if (existingCustomerWithEmail && existingCustomerWithEmail.id !== id) {
                return reply.status(409).send({
                    status: 'error',
                    message: 'O email fornecido já está em uso por outro cliente.'
                });
            }
        
            await this.editCustomersService.updateOne(id, { name, email });
            return reply.status(200).send({
                status: 'success',
                message: 'Cliente atualizado com sucesso.'
            });
        } catch (error) {
            console.error(error)
            throw new Error(error);
        }

        

    }


    public async deleteCustomers(request: FastifyRequest, reply: FastifyReply): Promise<void>{
        try {
            const { id } = request.params as ICustomerId;

            await this.editCustomersService.deleteOne(id);
            
        } catch (error: any) {
            console.error(error)
            throw new Error(error);
        }
    }

}