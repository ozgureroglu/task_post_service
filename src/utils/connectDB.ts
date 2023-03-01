import mongoose from 'mongoose';
import config from 'config';

console.log(config.get('dbUsername'))


const dbUrl = `mongodb://${config.get('dbUsername')}:${config.get(
  'dbPass'
)}@${config.get('dbServer')}:${config.get('dbPort')}/${config.get('dbName')}?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
