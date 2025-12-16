// import modules
const db =require('../dataBase/db');

class CRUD{
  async readEmployee(em_name,offset,limit){
   try{
     // client need data request only sent  that data
      const query=`call sp_getEmployees(?,?,?,?) `;
  
     const [[result]]=await db.query(query,[null,em_name,limit,offset]) 
     console.log(result)
     return result; 
    }

   catch(err){
    //  new Error(err)
     console.log(err);
    } 
  }

  async readById(id){
    console.log('----- Enter in GET by id')
    console.log(id)
    try{    
    const query=`call sp_getEmployees(?,?,?,?)`;

    const [[result]]=await db.query(query,[id,null,0,0]); 
    console.log(result)
    return result;

    }
   catch(err){
    //  new Error(err)
     console.log(err);
    } 
  }
  
  async createEmployee(name,email,position,salary,manager_id,created_at,is_deleted,delete_at){
    try{
      const query=`call sp_createEmployees(?,?,?,?,?,?,?,?)`
      //INSERT INTO EMPLOYEES(name,email,position,salary,manager_id,created_at,is_deleted,delete_at)VALUES(?,?,?,?,?,?,?,?)

      const [result]=await db.query(query,[name,email,position,salary,manager_id,created_at,is_deleted,delete_at]);

      console.log(result);
      console.log(result.affectedRows);
  
      return result.affectedRows
    }
   catch(err){
      // return new Error(err);
      return new Error('sql query error find to fixed them');
    }
  }
  
  async updateEmployees(id,name,position,salary){
    try{
     const query='call updateEmployees';
     const [result]=await db.query( query,[id,name,position,salary]);
     console.log(result);
     console.log(result.affectedRows);
     return result.affectedRows
    }
   catch(err){
      console.log(err)
    }
  }

  async remove(id,soft_del,timing){
    try{ 
    const query ='call deleteEmployees(?,?,?)';
    const [result]=await db.query(query,[id,soft_del,timing]);
    console.log(result);
    console.log(result.affectedRows);
    return result.affectedRows
    }
   catch(err){
      console.log(err)
    }
  } 
 

 // logic api

  //calculate a number of employees
  async totalCount(){
   try{  
   const [[total]]=await db.query(`select count(*) as total_employees from employees where is_deleted = false`)
   return total.total_employees
   }
   catch(err){
    console.log(err)
   }
  }
  
  // search by employee
  async searchByName(name){
    const query=`select * from employees where name like ? or name like ? `//including space or not space
   const [result]=await db.query(query,[`%${name}%`,`%${name}%`]) 
   return result;
  }

}

module.exports=CRUD;