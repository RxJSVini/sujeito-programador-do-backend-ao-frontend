import { prismaClient } from '../prisma/prismaClient';
import { CustomerGet, CustomerProps} from '../interfaces/ICustomers';

export class CustomersGet implements CustomerGet {

    private prismaDB = prismaClient;

    public async getAll(
    ): Promise<CustomerProps[]> {
        try {
            const customers = await this.prismaDB.customer.findMany({});
            return customers
           
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    public async getOneById(
        id: string
        ): Promise<CustomerProps> {
        try {
            const customers = this.prismaDB.customer.findUnique({
                where: {
                    id: id
                }
            });

            return customers;

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }


    public async getOneByEmail(
        email: string
        ): Promise<CustomerProps> {
        try {
            const customers = this.prismaDB.customer.findUnique({
                where: {
                    email:email
                }
            });

            return customers;

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}


