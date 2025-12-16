use  managementSystem_db;


create table employees(
 id int primary key auto_increment,
 name varchar(100) not null,
 email varchar(150) unique not null,
 position varchar(100) not null,
 salary   decimal(10,2)  default 0,
 manager_id  int,
 -- created_at DATETIME DEFAULT NOW(),  alternative ways in without joi
created_at datetime default current_timestamp,

FOREIGN KEY (manager_id) REFERENCES users(id)  -- em table la man_id is fK for urs table eureka id pk linked

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


use managementSystem_db;
 select * from employees;
 
 select * from employees where name like 'r%' order by position limit 3  offset 0 ;

-- join tables 

  select e.id AS employee_id,e.name AS employee_name,e.email AS employee_email, e.position AS employee_role, e.manager_id, u.name AS manager_name, u.role AS manager_role, u.email AS manager_email
  FROM employees e
  LEFT JOIN users u
  ON e.manager_id = u.id
  WHERE e.id = 8;
  -- 
  select e.id AS employee_id,e.name AS employee_name,e.email AS employee_email, e.position AS employee_role, e.manager_id, d.file_name,d.file_path,d.upload_at
  FROM employees e
  inner JOIN documents d
  ON e.id= d.employee_id
  where e.id=1;

-- pagination 
  select count(name)as total_employee from employees;
  select count(*) as total_employees from employees;
  select e.id AS employee_id,e.name AS employee_name,e.email AS employee_email, e.position AS employee_role, e.manager_id, u.name AS manager_name, u.role AS manager_role, u.email AS manager_email
      FROM employees e
      LEFT JOIN users u
      ON e.manager_id = u.id
      order by employee_id desc
      limit 10 offset 0
    ;
      
-- soft delete so changed a table
   select * from employees;
   select * from employees where is_deleted = false;
   select * from employees where is_deleted = true;

 alter table employees add column(is_deleted boolean default false,delete_at timestamp default null);



update employees
set name='ammu',email="ammucute@gmail.com",position="Test Engineer",salary= 20000,manager_id=3,is_deleted=true, delete_at=now()
where id = 48;




-- table data
  INSERT INTO employees (name, email, position, salary, manager_id) 
  VALUES
  -- manager_id = 1 (1 person)
  ('Arjun Kumar', 'arjun.kumar@gmail.com', 'Software Engineer', 55000.00, 1),
  -- manager_id = 2 (3 people)
  ('Priya Sharma', 'priya.sharma@gmail.com', 'Frontend Developer', 60000.00, 2),
  ('Rahul Mehta', 'rahul.mehta@gmail.com', 'Backend Developer', 58000.00, 2),
  ('Neha Verma', 'neha.verma@gmail.com', 'UI/UX Designer', 50000.00, 2),
  -- manager_id = NULL (2 people)
  ('Ravi Singh', 'ravi.singh@gmail.com', 'DevOps Engineer', 62000.00, NULL),
  
  ('Karthik Iyer', 'karthik.iyer@gmail.com', 'QA Engineer', 48000.00, NULL),
  -- Remaining rows (random between 1–3)
  ('Anita Nair', 'anita.nair@gmail.com', 'Project Manager', 75000.00, 3),
  ('Suresh Reddy', 'suresh.reddy@gmail.com', 'System Analyst', 53000.00, 3),
  ('Deepa Joshi', 'deepa.joshi@gmail.com', 'HR Executive', 45000.00, 1),
  ('Vikram Patil', 'vikram.patil@gmail.com', 'Data Engineer', 67000.00, 2),
  ('Meera Nair', 'meera.nair@gmail.com', 'Mobile App Developer', 56000.00, 3),
  ('Ajay Gupta', 'ajay.gupta@gmail.com', 'Business Analyst', 60000.00, 1),
  ('Sneha Rao', 'sneha.rao@gmail.com', 'Tech Lead', 80000.00, 2),
  ('Rohit Sharma', 'rohit.sharma@gmail.com', 'Cloud Engineer', 72000.00, 3),
  ('Isha Malhotra', 'isha.malhotra@gmail.com', 'Support Engineer', 40000.00, 1),
  ('Gaurav Mishra', 'gaurav.mishra@gmail.com', 'Database Admin', 65000.00, 3),
  ('Pooja Desai', 'pooja.desai@gmail.com', 'Test Engineer', 47000.00, 2),
  ('Manoj Pillai', 'manoj.pillai@gmail.com', 'Network Engineer', 55000.00, 1),
  ('Divya Kapoor', 'divya.kapoor@gmail.com', 'Full Stack Developer', 70000.00, 3),
  ('Harish Kumar', 'harish.kumar@gmail.com', 'Scrum Master', 77000.00, 2);
  
  

SHOW PROCEDURE STATUS WHERE Db='managementSystem_db';
drop procedure if exists sp_getEmployees;

drop procedure if exists updateEmployees;

-- sp in getEmployee

delimiter $$
create procedure sp_getEmployees(in em_id int,in em_name varchar(255),in limits int ,in offset int )
begin
 declare sql_query text;
 set sql_query='select * from employees where is_deleted=false';
 
 if em_id is not null then 
  set sql_query =concat(sql_query,' and id = ',em_id);
 end if;

if em_name is not null and em_name !='' then
   set sql_query =concat(sql_query,' and name =  ''',replace(em_name,'''',''''''),'''');
end if;
  
 if limits > 0 then
   set sql_query=concat(sql_query,' limit ', limits ,' offset ', offset);
  end if;
  
 set @sql_query=sql_query;
 prepare stmt from @sql_query;
 execute stmt;
 deallocate prepare stmt;
 
end $$
 delimiter ;
 
 set @id=null;
 set @name=null;
 set @limit=5;
 set @offset=0;

 call sp_getEmployees(null,'Rahul Mehta',@limit,@offset);
 call sp_getEmployees(null,null,@limit,@offset);
 call sp_getEmployees(null,null,@limit,8);
 
 
  stop
 -- sp in new employee
 delimiter $$
 create procedure sp_createEmployees(in em_name varchar(255),in email varchar(255),in position varchar(255),in salary decimal(10,2),in manager_id int,in created_at timestamp,in is_deleted  boolean,in delete_at timestamp)
 begin
  INSERT INTO EMPLOYEES(name,email,position,salary,manager_id,created_at,is_deleted,delete_at) 
  VALUES(em_name,email,position,salary,manager_id,created_at,is_deleted, delete_at );
  end $$
delimiter ;  
 
 call sp_createEmployees('suryakal','suryalkal@gamil.com','Could Deploy',30000,3,now(),0,null);
 
 
  drop procedure if exists updateEmployees;
  
--  Update in sp
  delimiter $$
  create procedure updateEmployees(in emp_id int,in emp_name varchar(255),in emp_position varchar(255),in emp_salary decimal(10,2))
begin
declare sql_query text;
declare updated_query text;
declare logic boolean default true;
--
set updated_query='update employees set';
 
 if emp_name is not null and emp_name != '' then
      set sql_query = concat(updated_query,' name = ''',replace(emp_name,'''',''''''),' ''');
      set logic =false;
 end if;
 
 if emp_position is not null and emp_position != '' then
  if logic then
   set sql_query = concat(updated_query,' position = ''',replace(emp_position,'''',''''''),' ''');
   set logic =false ;
 else 
  set sql_query = concat(updated_query,', position = ''',replace(emp_position,'''',''''''),' ''');
  end if;
end if;

if emp_salary is not null  then 
   if logic then
     set sql_query = concat(updated_query,' salary = ',emp_salary );
     set logic =false;
   else
     set sql_query = concat(updated_query,', salary = ',emp_salary );
   end if;     
 end if;  
 
   set @sql_query =concat(sql_query,' where id = ',emp_id);
   prepare stmt from @sql_query;
   execute stmt;
   deallocate prepare stmt;
 
 end $$
 delimiter ;
 
 call updateEmployees(50,null,'Mobile App developer',null)
 
 
-- delete sp

 delimiter $$
 create procedure deleteEmployees(in emp_id int,in boolan boolean,in timing timestamp)
 begin
  -- delete from  EMPLOYEES  where id =emp_id;
   update employees set is_deleted = boolan , delete_at=timing  where id = emp_id ;  
  end $$
delimiter ;  

set @boolan=true;
set @timeimg=now(); 
call deleteEmployees(3,@boolan,now());
 
select @sql_query
 
  