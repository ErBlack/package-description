import Ajv from 'ajv/dist/2020.js';
import { readFileSync } from 'fs';

const ajv = new Ajv();

const schema = JSON.parse(readFileSync(new URL('../schema.json', import.meta.url), 'utf-8'));

const validateSchema = ajv.compile(schema);

/**
 * @param {import('./description.d').PackageDescription} data
 * @returns {import('./description.d').Problem[]}
 */
export const validate = (data) => {
    if (!validateSchema(data) && validateSchema.errors) {
        console.log(validateSchema.errors);
        const errors = validateSchema.errors.reduce((acc, { instancePath, message }) => {
            if (!acc[instancePath]) {
                acc[instancePath] = new Set();
            }

            acc[instancePath].add(message);

            return acc;
        }, {});

        return Object.entries(errors)
            .map(([path, messages]) => {
                return [...messages].map((message) => {
                    /**
                     * @type {import('./description.d').Problem}
                     */
                    const problem = {
                        level: 'error',
                        path,
                        message,
                    };

                    return problem;
                });
            })
            .flat();
    }

    return [];
};
