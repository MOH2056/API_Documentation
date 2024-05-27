//importing an express module
const xpress = require('express');

//importing a swagger-ui-express module
const swaggerUi = require("swagger-ui-express");

//importing a swagger-jsdoc module
const swaggerJs = require("swagger-jsdoc");

//starting up the server
const app = xpress();

//configuration for swagger documentation
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

//Generating swagger documentation based on the configuration defined above
const swagN = swaggerJs(list);

//setting a middleware
app.use('/', swaggerUi.serve, swaggerUi.setup(swagN))

//Starting the server on a port and display a console message
app.listen(3000, () => {
    console.log('SERVER IS RUNNING')
 });