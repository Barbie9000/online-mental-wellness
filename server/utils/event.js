import { createError } from 'h3';

export const readAndValidateBody = async function (event, { include = [], strict = false, customValidators = {} }) {
    const body = await readBody(event);

    // Utility function to get a value from a nested field using dot notation
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    };

    // Strict mode: Ensure no unexpected keys are present
    if (strict) {
        const unexpectedKeys = Object.keys(body).filter(key =>
            !include.some(includeKey => includeKey === key || includeKey.startsWith(`${key}.`))
        );
        if (unexpectedKeys.length > 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: unexpectedKeys.map(key => ({
                    field: key,
                    message: `Unexpected field: ${key}`,
                })),

            });
        }
    }

    // Check for missing keys in the body
    const missingKeys = include.filter(key => !getNestedValue(body, key));
    if (missingKeys.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            data: missingKeys.map(key => ({
                field: key,
                message: `Field is required`,
            })),

        });
    }

    // Custom validation logic
    const validationErrors = [];
    for (const [field, validator] of Object.entries(customValidators)) {
        const value = getNestedValue(body, field);
        if (value !== undefined) {
            try {
                const isValid = validator(value);
                if (!isValid) {
                    validationErrors.push({ field, message: `${field} is invalid` });
                }
            } catch (err) {
                validationErrors.push({ field, message: `${field} validation failed: ${err.message}` });
            }
        }
    }

    // Throw if there are validation errors
    if (validationErrors.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            data: validationErrors,

        });
    }


    return body;
};
