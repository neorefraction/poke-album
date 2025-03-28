import UserService from "../model/services/UserService.js";

// Regex expressions
const USERNAME_REGEX = /^(?=.{6,}$)[a-zA-Z][\w]+$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.(com|es)$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,})/;

/**
 * Check if an email is valid or not
 * @param {string} email
 * @returns {boolean} True if email is valid, false otherwise
 */
const isValidEmail = (email) => {
    email = email.toLowerCase();
    return EMAIL_REGEX.test(email);
};

/**
 * Check if a username is valid or not
 * @param {String} username
 * @returns {boolean} True if username is valid, false otherwise
 */
const isValidUsername = (username) => {
    return USERNAME_REGEX.test(username);
};

/**
 * Check if a password is valid or not
 * @param {String} password
 * @returns {boolean} True if password is valid, false otherwise
 */
const isValidPassword = (password) => {
    return PASSWORD_REGEX.test(password);
};

const login = async (identifier, password) => {
    if(!identifier.includes('@')) 
        return await UserService.loginByUsername(identifier, password);
    identifier = identifier.toLowerCase();
    return await UserService.loginByEmail(identifier, password);
}

const signup = async (username, email, password) => {
    // Check if user email has correct format
    if(!isValidEmail(email)) throw new Error('Invalid email format');
    // Check if user username has correct format
    if(!isValidUsername(username)) throw new Error('Invalid username format');
    // Check if user password has correct format
    if(!isValidPassword(password)) throw new Error('Invalid password format');

    email = email.toLowerCase();
    return await UserService.signup(username, email, password);
}

export default { login, signup };