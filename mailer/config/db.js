const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, 'db.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const connectDB = async () => {
    try {
        await mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

