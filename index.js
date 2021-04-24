const Express = require('express');
const database = require('./db');
const userController = require('./controllers/userController');

const app = Express();

app.use(Express.json());

app.use('/user', userController);

database.sync();

app.listen(8080, () => console.log(`[8080]: a message`));