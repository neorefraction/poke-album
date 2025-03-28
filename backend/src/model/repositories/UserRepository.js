import sqlite3 from 'sqlite3';

const database = process.env.DATA_BASE;

const insertUser = async (user) => {
    const db = new sqlite3.Database(database);
    const id = await new Promise((resolve, reject) => {
        db.run('INSERT INTO user (username, email, password) VALUES (?,?,?)', [user.username, user.email, user.password], function(error) {
            if(!error) resolve(this.lastID); else reject(error);
        });
    });
    db.close(); // close the database connection
    return id;
}

/**
 * 
 * @param {number} username user database id
 * @returns the 
 */
const getUserByUsername = async (username) => {
    const db = new sqlite3.Database(database);
    const user = await new Promise((resolve, reject) => {
        db.get('SELECT id, password FROM user WHERE username = ?', username, function(error, row) {
            if(!error) resolve(row); else reject(error);
        });
    });
    db.close(); // close the database connection
    return user;
}

const getUserByEmail = async (email) => {
    const db = new sqlite3.Database(database);
    const user = await new Promise((resolve, reject) => {
        db.get('SELECT id, password FROM user WHERE email = ?', email, function(error, row) {
            if(!error) resolve(row); else reject(error);
        });
    });
    db.close(); // close the database connection
    return user;
}

export default { insertUser, getUserByUsername, getUserByEmail };