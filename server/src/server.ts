import { app } from './app';

const start = async () => {
    try {
    
        await app.listen({ port: 3333 });

        } catch (error) {
            console.error(error);
            process.exit();
        }
}
start();