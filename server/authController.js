const bcrypt = require('bcryptjs')
require('dotenv').config()

const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    auth: async (req,res) => {
        const {username, firstName, lastName, password} = req.body

        const [[user]] = await sequelize.query(`
            SELECT * FROM users
            WHERE username = '${username}';
        `)

        if(user){
            console.log("it's a login")
        } else if(!user && firstName && lastName){
            console.log("it's a register")

            const salt = bcrypt.genSaltSync(5)
            const passHash = bcrypt.hashSync(password, salt)
            console.log(salt, passHash)

            const [[newUser]] = await sequelize.query(`
                INSERT INTO users ( username, first_name, last_name, password ) 
                VALUES ( '${username}', '${firstName}', '${lastName}', '${passHash}' )
                RETURNING user_id, username, first_name, last_name;
            `)

            console.log(newUser)
            res.status(200).send(newUser)
        }
    }
}