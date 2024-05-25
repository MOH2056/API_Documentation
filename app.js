//importing an express module
const xpress = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerJs = require("swagger-jsdoc");

//startin up the server
const app = xpress();

const list = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BOOKLIST API",
            description: "CRUD API",
            version: "1.0",
        },
        servers: [ 
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const swagN = swaggerJs(list);
app.use('/', swaggerUi.serve, swaggerUi.setup(swagN))
app.listen(3000, () => {
    console.log('SERVER IS RUNNING')
 });