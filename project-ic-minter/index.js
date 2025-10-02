const express = require('express');
const router = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use('/v1', router);
app.use(errorConverter);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});