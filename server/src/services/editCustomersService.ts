import { CustomerEdit, CustomerProps } from '../interfaces/ICustomers';
import { prismaClient } from '../prisma/prismaClient';

export class CustomerEditService implements CustomerEdit {

    private prismaDB = prismaClient;


    public async updateOne(id: string, customer_data: CustomerProps): Promise<void> {
        
        try {


            await this.prismaDB.customer.update({
                where:{
                    id: id
                },
                data:{
                    email: customer_data.email,
                    name: customer_data.name,
                    status: customer_data.active
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Customer update error');
        }
    }
    public async deleteOne(
        id: string
        ): Promise<void>{

        try {
            await this.prismaDB.customer.delete({
                where:{
                    id
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Customer deletetion error');
        }
    }
}