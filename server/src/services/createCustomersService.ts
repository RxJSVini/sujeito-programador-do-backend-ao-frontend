import { prismaClient } from '../prisma/prismaClient';
import { CustomerCreate, CustomerProps} from '../interfaces/ICustomers';

export class CustomerServiceCreate implements CustomerCreate {
 
    private prismaDB = prismaClient;

    public async execute(
        data: CustomerProps
        ): Promise<any> {   
        try {

            return await this.prismaDB.customer.create({
                data:{
                    name: data.name,
                    email: data.email
                
                }
            })

        } catch (error) {
            console.error(error)
            throw new Error('Customer creation error');
        }
    }

}


