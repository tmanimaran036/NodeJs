use  managementsystem_db;


create table documents(
 id int  primary key  auto_increment,
 employee_id  int,
 file_name  varchar(255) not null,
 file_path varchar (255) not null,
 upload_by  int ,
 upload_at  datetime default current_timestamp,

 FOREIGN KEY (employee_id) REFERENCES employees(id),
 foreign key (upload_by) references users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * FROM documents