const db=require('../dataBase/db');
const jwt=require('jsonwebtoken');

//validation in register and  check for login email & password
class validation{
    
 async emailVal(email){
    const [data]=await db.query('SELECT * FROM USERS WHERE EMAIL=?',[email])
    return data  // return a array
  }
  async passVal(email){
    const data=await db.query('SELECT password FROM USERS WHERE EMAIL=?',[email])
    console.log(data) //
  }
  

  // create 
  async newRegister(name,email,password,role,created_at){
  // sql query always return array is [{row},field]
    const [data] = await db.query(`
     INSERT INTO users(name,email,password,role,created_at)
     values(?,?,?,?,?)`,[name,email,password,role,created_at] // avoid in sql injection
    );
    return data.insertId //return a object in one key value
  }
}

module.exports=validation;