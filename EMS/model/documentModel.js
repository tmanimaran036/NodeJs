// import modules
const db =require('../dataBase/db');

class DocumentClass{

 /*   
 async readAll(){
   try{
     const result =await db.query(`SELECT * FROM EMPLOYEES`);
     return result 
    }
   catch(err){
    //  new Error(err)
     console.log(err);
    } 
  }
 */

 /*
  async readUnique(id){
    console.log('----- renter unique')
    console.log(id)
    try{    
     const [result] =await db.query(`SELECT * FROM EMPLOYEES WHERE id=?`,[id]);
     console.log(result)
     return result ;
    }
   catch(err){
    //  new Error(err)
     console.log(err);
    } 
  }
  */
  async createDoc(employee_id,file_name,file_path,upload_by,upload_at){
    try{
     const query=`insert into documents(employee_id,file_name,file_path,upload_by,upload_at)
     values(?,?,?,?,?)`;
      const [result]=await db.query(query,[employee_id,file_name,file_path,upload_by,upload_at])
      console.log(result);
      console.log(result.affectedRows);
      return result.affectedRows
    }
   catch(err){
      console.log(err)
    }
  }
  
  /*
  async updated(name,email,position,salary,manager_id,created_at,id){
    try{
     const [result]=await db.query(`UPDATE EMPLOYEES
     SET name=?,email=?,position=?,salary=?,manager_id=?,created_at=? 
     WHERE id=?
     `,[name,email,position,salary,manager_id,created_at,id]);
     console.log(result);
     console.log(result.affectedRows);
     return result.affectedRows
    }
   catch(err){
      console.log(err)
    }
  }
 */

  /*
    async remove(id){
    try{
     const [result]=await db.query(`DELETE FROM EMPLOYEES
       WHERE id=?
     `,[id]);
     console.log(result);
     console.log(result.affectedRows);
     return result.affectedRows
    }
   catch(err){
      console.log(err)
    }
  }
  */


}

module.exports=DocumentClass;