import {z} from 'zod';
import Joi from 'joi';

/**
 * joi
 * - properties are optional by default
 * - empty string is rejected by default
 * - trim() just removes whitespace
 */
const USER_INPUT_STRING_JOI = Joi.string().trim();
/**
 * zod
 * - properties are required by default, we cannot add .optional() because you can't call .regex() on an optional string
 * - empty string is allowed by default, we have to add .min(1) to reject it
 * - trim() just removes whitespace
 */
const USER_INPUT_STRING_ZOD = z.string().min(1).trim();

/**
 * joi
 */
const USERNAME_JOI = Joi.alternatives([USER_INPUT_STRING_JOI.regex(/^\S+$/).min(3).max(64), Joi.string().email()]);
/**
 * zod
 */
const USERNAME_ZOD = z.union([USER_INPUT_STRING_ZOD.regex(/^\S+$/).min(3).max(64), z.string().email()]);

const emptyString = '';

console.log(`joi: empty string|USER_INPUT: ${USER_INPUT_STRING_JOI.validate(emptyString).error}`);
console.log(`zod: empty string|USER_INPUT: ${USER_INPUT_STRING_ZOD.safeParse(emptyString).success}`);

const username = 'test';

console.log(`joi: username|USERNAME: ${USERNAME_JOI.validate(username).error}`);
console.log(`zod: username|USERNAME: ${USERNAME_ZOD.safeParse(username).success}`);

const usernameEmail = 'test@test.com';

console.log(`joi: usernameEmail|USERNAME_EMAIL: ${USERNAME_JOI.validate(usernameEmail).error}`);
console.log(`zod: usernameEmail|USERNAME_EMAIL: ${USERNAME_ZOD.safeParse(usernameEmail).success}`);
