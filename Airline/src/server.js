require('reflect-metadata')
const { PORT }=require('./config/index.js')
const  { AppDataSource  } =require('./config/db')
const app = require('./app')

AppDataSource.initialize()
.then(()=> {
    console.log('db success')
    app.listen(PORT,()=>{
    console.log(`server on port number is ${PORT} `)
    });
     
})
.catch((err)=> console.error(err))

