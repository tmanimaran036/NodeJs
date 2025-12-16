-- user table

create table managementsystem_db.users(
   id int  primary key auto_increment,
   name varchar(100) not null,
   email  varchar(150) unique not null ,
   password varchar(255) not null,
   role  enum('user','admin') not null default'user',
   created_at datetime default current_timestamp
)ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci;
use  managementsystem_db;

select * from users; 
--
drop table employees;
drop table users


