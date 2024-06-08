const express = require("express");
const connectDB = require('./config/dbconfig');
const corsMiddleware = require('./middleware/corsMiddleware');
const bodyParserMiddleware = require('./middleware/bodyParserMiddleware');


const app = express();

app.use(corsMiddleware);
app.use(bodyParserMiddleware);
app.use(express.json());

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/ads', adsRouter);
app.use('/api/prices', priceRouter);
app.use('/api/support', supportRouter);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
