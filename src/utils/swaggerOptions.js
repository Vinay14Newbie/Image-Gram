// const pathToRoutesFile = new URL('../routers/v1/*.js', import.meta.url).pathname;
// console.log(pathToRoutesFile)
// This path is not working in my PC :/

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Image gram API',
            version: '1.0.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
    },
    apis: ['/Users/LENOVO/Backend_Projects/Imagegram/src/routers/v1/*.js'],
};