
const mysql = require("mysql2")

const pool = mysql.createPool({
    connectionLimit:10,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database: process.env.DB_NAME
});

let db = {};


// const mysqlpool = pool.promise()

// db.getAllMahasiswa = () => {
//     return new Promise((resolve, reject) => {
//         pool.query("SELECT * FROM mahasiswa", (err, mahasiswa) => {
//             if(err) {
//                 return reject(err);
//             }
//             return resolve(mahasiswa);
//         })
//     })
// };

// db.getOneMahasiswa = (id) => {
//     return new Promise((resolve, reject) => {
//         pool.query("SELECT * FROM mahasiswa WHERE id = ?", [id], (err, mahasiswa) => {
//             if(err) {
//                 return reject(err);
//             }
//             return resolve(mahasiswa);
//         })
//     })
// }

// Request To User Table

db.allUser = () => {
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * from user ',(error,users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users);
        });
    });
};

db.getUserByEmail = (email) =>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * from user WHERE email = ? ",[email],(error,users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users);
        });
    });
};

db.insertUser = (username,email,password)=> {
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO user (username,email,password) VALUES (?,?,?) ",[username,email,password],(error,result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result.insertId);
        })
    })
}

db.updateUser = (username,role,email,password,id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("UPDATE user SET username=?,role=?,email=?,password=? WHERE id=?",[username,role,email,password,id],(error)=>{
            if(error){
                return reject(error);
            }
            return resolve();
        })
    })
}

db.deleteUser = (id) => {
    return new Promise((resolve,reject)=>{
        pool.query("DELETE FROM user WHERE id=?",[id],(error)=>{
            if(error){
                return reject(error);
            }
            return resolve();
        });
    });
};
module.exports = db;