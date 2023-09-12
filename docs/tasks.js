const getAllUsers = {
    tags: ['Users'], // Endpoint belongs to the group Users
    description: 'Get all users',
    operationId: 'getAllUsers',
    security: [
        {
            bearerAuth: [],
        }
    ],
    requestBody: {},
    responses: {
        '200': {
            description: 'All users were obtained',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/getUserSchema',
                        },
                    },
                },
            },
        },
    }
}

const taskSchema = {
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
};



module.exports = {
    taskSchema
}