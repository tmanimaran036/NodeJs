const express = require('express');
const app=express.Router();

// import modules 
const db=require('./db');

// API with Pagination
app.get('/users',async (req, res) => {
    console.log('enter a api') 
  let page = parseInt(req.query.page) || 1;   // default page=1
  let limit = parseInt(req.query.limit) || 5; // default limit=5
  let offset = (page - 1) * limit;

  console.log('Query total count')
 const [[query1]]=await db.query('SELECT COUNT(*) as total_employees FROM employees');
  console.log(query1)

    let totalUsers = query1.total_employees;
    let totalPages = Math.ceil(totalUsers / limit);
  
    console.log(totalUsers,totalPages)

    // Fetch data with limit + offset
   const [[query2]] =await db.query(`SELECT * FROM employees LIMIT ? OFFSET ?`, [limit, offset]);      
   console.log(query2)
   if (query2.length === 0) return res.status(500).json({ error: err.message });
    res.json({
        page,
        limit,
        totalUsers,
        totalPages,
        data: query2
      });
    });

module.exports=app;