//models/index.js
import mongoose from 'mongoose';
// import { DB_URL } from '../config';
// mongoose.Promise = global.Promise;

// mongoose.connect(DB_URL, {family: 4,});

const databaseConnection = mongoose.connection;

// databaseConnection.on('error', () => console.error.bind(console, 'connection error'));

// databaseConnection.once('open', () => console.info('Connection to Database is successful'));

export default databaseConnection;
