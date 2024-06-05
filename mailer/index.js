const express = require('express');
const connectDB = require('./config/db');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const emailRoutes = require('./routes/emailRoutes');
const corsMiddleware = require('./middleware/corsMiddleware');
const bodyParserMiddleware = require('./middleware/bodyParserMiddleware');
require('./actions/emailAction');

const app = express();

app.use(corsMiddleware);
app.use(bodyParserMiddleware);

connectDB();

app.use('/mail', subscriptionRoutes);
app.use('/mail', emailRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
