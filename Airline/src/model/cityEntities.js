const { EntitySchema } =require('typeorm')

module.exports.City=new EntitySchema({
 name:'City',
 tableName:'cities',
 columns:{
    id:{
        primary:true,
        type:'int',
        generated:true
    },
    city:{
       type:'varchar',
       unique: true,
       nullable:false,
    }
 }

})