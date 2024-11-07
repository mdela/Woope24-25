const bcrypt = require('bcryptjs');
const saltRounds = 10;

/**
 * Hashes a password using bcrypt.
 *
 * This function takes a plain-text password and generates a hashed version using bcrypt.
 * The level of hashing is determined by the `saltRounds` configuration, which defines
 * the computational cost.
 *
 * @param password - The plain-text password to be hashed.
 * @returns A promise that resolves to the hashed password string.
 */
export const hashPassword = async (password:string) => {
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain-text password with a hashed password.
 *
 * This function checks if a given plain-text password matches a stored hashed password
 * using bcrypt's comparison method.
 *
 * @param password - The plain-text password to be verified.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to `true` if the passwords match, or `false` otherwise.
 */
export const comparePasswords = async (password:string, hashedPassword:string) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePasswords };