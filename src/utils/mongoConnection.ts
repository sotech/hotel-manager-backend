import mongoose from 'mongoose'
import dotenv from 'dotenv';

const mongo = () => {
    dotenv.config()

    const mongo_URI: string = process.env.MONGO_URI || '';

    mongoose.connect(mongo_URI, () => {
        console.log('Conectado a Hotel DB')
    })
}
export default mongo;