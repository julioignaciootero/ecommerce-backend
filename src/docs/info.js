export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "API para ecommerce",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "ecommerce-backend-production-ab89.up.railway.app",
        description: "Produccion",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
