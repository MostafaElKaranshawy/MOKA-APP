import {  query, validationResult } from 'express-validator';

export const paginationValidation = [
    query('page')
        .exists().withMessage('Page number is required')
        .isInt({min: 1})
        .withMessage('Page number must be a positive integer'),
    query('limit')
        .exists().withMessage('Limit is required')
        .isInt({min: 1})
        .withMessage('Limit must be a positive integer'),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    }
];