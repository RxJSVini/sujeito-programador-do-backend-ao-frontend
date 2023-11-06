export interface CustomerProps {
    id?: string;
    name?: string;
    email?: string;
    active?: boolean;
}

export interface CustomerCreate<T = any> {
    execute({ name, email }: CustomerProps):Promise<T>;
}

export interface CustomerGet {
    getAll(): Promise<CustomerProps[]>;
    getOneById(id:string):Promise<CustomerProps>;
    getOneByEmail(email:string):Promise<CustomerProps>;

}


export interface CustomerEdit {
    updateOne(id: string, crustomer_data: CustomerProps):Promise<void>;
    deleteOne(id:string):Promise<void>;
}