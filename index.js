const express = require('express');
const connection = require('./configuration/configDb');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const userRoute = require("./modules/users/routes/userRoutes")

connection();
const cors = require('cors');
app.use(cors());


app.use(express.json());

app.use(userRoute);




 
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));