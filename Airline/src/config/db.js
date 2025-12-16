const { DataSource }=require('typeorm')
require('dotenv').config();
const { User }=require('../model/useEntities')
const { City }=require('../model/cityEntities')


 const AppDataSource = new DataSource({
    type: 'mysql',
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    synchronize:true,
    logging:false,
    entities:[User,City]
})
 module.exports={ AppDataSource }