const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Task API doc',
        description: 'This is the API documentation for my project.',
        contact: {
            name: 'Your Name Here',
            email: 'dev@example.com',
            url: 'https://devwebsite.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:8080/',
            description: 'Local Server',
        },
        {
            url: 'https://my.production.domain.com',
            description: 'Production Server',
        },
    ],
    tags: [
        {
            name: 'Tasks',
        },
        {
            name: 'Authentication',
        },
    ],
    paths: {
        '/tasks': {
            get: {
                tags: ['Tasks'],
                summary: 'Retrieve a list of all tasks',
                responses: {
                    '200': {
                        description: 'List of tasks retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Task',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Tasks'],
                summary: 'Create a new task',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Task',
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Task created successfully',
                    },
                },
            },
        },
        '/tasks/{id}': {
            get: {
                tags: ['Tasks'],
                summary: 'Retrieve a specific task by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the task to retrieve',
                        schema: {
                            type: 'integer',
                            format: 'int32', // Assuming 32-bit integer
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Task retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Task',
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ['Tasks'],
                summary: 'Update an existing task by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the task to update',
                        schema: {
                            type: 'integer',
                            format: 'int32', // Assuming 32-bit integer
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UpdateTask',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Task updated successfully',
                    },
                },
            },
            delete: {
                tags: ['Tasks'],
                summary: 'Delete a task by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the task to delete',
                        schema: {
                            type: 'integer',
                            format: 'int32', // Assuming 32-bit integer
                        },
                    },
                ],
                responses: {
                    '204': {
                        description: 'Task deleted successfully',
                    },
                },
            },
        },
        '/register': {
            post: {
                tags: ['Authentication'],
                summary: 'Allows users to register with the system',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'User registered successfully',
                    },
                },
            },
        },
        '/login': {
            post: {
                tags: ['Authentication'],
                summary: 'Generates an authentication token for the user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Login',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Authentication token generated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: {
                                            type: 'string',
                                            description: 'Authentication token',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                security: [
                    {
                        tokenAuth:[], // Indicates that "token" is the key in the Headers
                    },
                ],
            },
        },
    },
    components: {
        schemas: {
            UpdateTask: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: 'Task title',
                        example: 'Complete project',
                    },
                    description: {
                        type: 'string',
                        description: 'Task description',
                        example: 'Finish all the tasks in the project by the deadline.',
                    },
                    status: {
                        type: 'string',
                        enum: ['PENDING', 'COMPLETED'],
                        default: 'PENDING',
                        description: 'Task status (either PENDING or COMPLETED)',
                        example: 'PENDING',
                    },
                },
            },
            Task: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int32', // Assuming 32-bit integer
                        description: 'Task ID',
                        example: 1,
                    },
                    title: {
                        type: 'string',
                        description: 'Task title',
                        example: 'Complete project',
                    },
                    description: {
                        type: 'string',
                        description: 'Task description',
                        example: 'Finish all the tasks in the project by the deadline.',
                    },
                    status: {
                        type: 'string',
                        enum: ['PENDING', 'COMPLETED'],
                        default: 'PENDING',
                        description: 'Task status (either PENDING or COMPLETED)',
                        example: 'PENDING',
                    },
                },
            },
            User: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        description: 'User name',
                        example: 'John Doe',
                    },
                    email: {
                        type: 'string',
                        description: 'User email',
                        example: 'email@email.com',
                    },
                    role: {
                        type: 'string',
                        enum: ['WRITER', 'READER'],
                        default: 'READER',
                        description: 'User role',
                        example: 'READER',
                    },
                    password: {
                        type: 'string',
                        description: 'User password | Password must have at least 8 characters and must contain at least one letter and one number',
                        example: '12345678a',
                    },
                },
            },
            Login: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        description: 'User email',
                        example: 'email@email.com',
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                        example: '12345678a',
                    
                    },
                },
            },
        },
        securitySchemes: {
            tokenAuth: { 
                type: 'apiKey',
                in: 'header', 
                name: 'token', 
            },
        },
    },
};

module.exports = apiDocumentation;
