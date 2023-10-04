import mongoose from 'mongoose';

let isConnected: boolean = false; //variable to track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

    if(isConnected) return console.log('=> using existing database connection');

    //use new database connection
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        isConnected = true;

        console.log('=> mongoDB Connected');
    } catch (error: any) {
        console.log('=> Error connecting to database: ', error);
        }

}