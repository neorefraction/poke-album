// External dependencies
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Internal dependencies
import UserRepository from '../repositories/UserRepository.js';

// Constants
export const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_SALT = Number(process.env.BCRYPT_SALT);

/**
 * Log user in
 * @param {Object} user Object with user data
 * @param {string} password
 * @returns {Promise} A promise that resolves to a token
 * @throws {Error} If user not found or password is incorrect
 */
const login = async (user, password) => {
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw new Error('Incorrect password');
    return jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});
};

const loginByEmail = async (email, password) => {
    const user = await UserRepository.getUserByEmail(email);
    if(!user) throw new Error('No user found with this email');
    return await login(user, password);
}

const loginByUsername = async (username, password) => {
    const user = await UserRepository.getUserByUsername(username);
    if(!user) throw new Error('No user found with this username');
    return await login(user, password);
}

/**
 * Register user in application
 * @param {*} username 
 * @param {*} email 
 * @param {*} password 
 * @returns token
 * @throws {Error} if user already exists or password is incorrect
 */
const signup = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT); // Encode password
    try {
        const id = await UserRepository.insertUser({username: username, email: email, password: hashedPassword});
        return jwt.sign({id: id}, JWT_SECRET, {expiresIn: '1h'});
    } catch (error) {
        console.log(error);
        if(error.errno !== 19) 
            throw new Error(error);
        if(error.message.includes('user.username'))
            throw new Error('Username already exists');
        throw new Error('Email already exists');
    }
};

export default { loginByEmail, loginByUsername, signup };