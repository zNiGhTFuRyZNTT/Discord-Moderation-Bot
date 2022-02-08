const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/admins.sqlite3', sqlite3.OPEN_READWRITE , err => {
    if (err)
        return console.error(err.message)
    console.log("[Database] > Connected to SQLite Database")
})
// db.run('create table admins (user_id integer)')

function getAdmin(userID) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM admins WHERE user_id = ?`, userID, (err, user) => {
            if (err) reject(err)
            resolve(user)
        })
    })
}

function addAdmin(user_id) {
    return new Promise((resolve, reject) => {
        getAdmin(user_id)
            .then(res => {
                if (res) {
                    resolve(false)
                }
                else 
                    db.run("INSERT INTO admins (user_id) VALUES (?)", [user_id], err => {
                        if (err) reject(err)
                        
                        resolve(true)
                    }) 
            })
            .catch(reject)
    })
}
function rmAdmin(user_id){
    return new Promise((resolve, reject) => {
        getAdmin(user_id)
            .then(res => {
                if (res) {
                    db.run(`DELETE FROM admins WHERE user_id = ?`, user_id, err => {
                        if (err) reject(err)

                        resolve(true)
                    })
                }
                else
                    resolve(false)
            })
    })
}

function isAdmin(user_id){
    return new Promise((resolve, reject) => {
        getAdmin(user_id)
            .then(res => {
                if (res)
                    resolve(true)
                else
                    resolve(false)
            })
    })
}

module.exports = {
    isAdmin: isAdmin,
    rmAdmin: rmAdmin,
    addAdmin: addAdmin,
    getAdmin: getAdmin,
}