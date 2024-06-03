//Importing an express module
const xpress = require('express');

//Importing a swagger-ui-express module
const swaggerUi = require("swagger-ui-express");

//Importing a swagger-jsdoc module
const swaggerJs = require("swagger-jsdoc");


//Starting up the server
const app = xpress();

app.use(xpress.json());

//Configuration for swagger documentation
const list = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BOOKLIST API",
            description: "CRUD API",
            version: "1.0.0",
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

//Setting a middleware
app.use('/api', swaggerUi.serve, swaggerUi.setup(swagN))

//Starting the server on a port and display a console message
app.listen(3000, () => {
    console.log('SERVER IS RUNNING')
 });
