const mongoose = require('mongoose');
mongoose.set('debug', true);

const connectDB = async () => {
    try {
        console.log('Attempting to connect to Local MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
    }
};

module.exports = connectDB;
