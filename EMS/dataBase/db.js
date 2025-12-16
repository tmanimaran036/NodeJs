const mySql=require('mysql2/promise');

const mySqlPool=mySql.createPool({
   host:'localhost',
   user:'root',
   password:'root',
   database:'managementSystem_db'
});

module.exports=mySqlPool;
   

/** admin
{
   "name":"SuperAdmin",
   "password":"Admin@001",
   "email" :"superadmin@gmail.com",
   "role": "admin"
}
{
 "name":"Admin",
 "password":"Admin@002",
 "email" :"adminc1@gmail.com",
 "role": "admin"
}
{
 "name":"HRM",
 "password":"hrmanagement@003",
 "email" :"humanresourec@gmail.com",
 "role": "user"
}
{
{
 "name":"product_manager",
 "password":"ProductManager@003",
 "email" :"productmanager@gmail.com",
 "role": "user"
}
*/