const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PathAid Backend API',
      version: '1.0.0',
      description: 'API documentation for PathAid Backend. This documentation includes all routes for managing users, facilities, vehicles, and transport requests.',
      contact: {
        name: 'API Support',
        email: 'support@pathaid.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server',
      },
      {
        url: 'https://pathaid-backend-1pyu.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')], // Use absolute path
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
