const { getAll, createUser, getByEmail, updateUser,  } = require("../../services");
const { StatusCodes } = require("http-status-codes");
const { successResponse, errorResponse } = require("../../utils/common");

async function info(req, res) {
  console.log(req.originalUrl);
  successResponse.message = "user info page api";
  successResponse.data = {};
  res.status(StatusCodes.OK).json({ successResponse });
}

async function getUsers(req, res) {
  try {
    // if not set query params and empty email query is also = false
    if(req.query.email) {
      const users = await getByEmail(req.query.email);
      successResponse.data = users;
      if (!users) {
       errorResponse.message='some thing went wrong';
        errorResponse.error = "!!! invalid email ";
        return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
      }

      return res.status(StatusCodes.OK).json(successResponse);
    }
    const users = await getAll();
    successResponse.data = users;
    res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    console.log(error);
  }
}

async function createUsers(req, res) {
  try {
    console.log(req.body);
    const is_active = await getByEmail(req.body.email);

    if (is_active) {
       errorResponse.message='some thing went wrong';
       errorResponse.error = "The Email ID Was Already Existing.";
      return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse);
    }

    const users = await createUser(req.body);
    res.json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
}

 async function updated(req,res){
   const id=parseInt(req.params.id)
   const data=req.body
    
   console.log(id , data)

   const updateUse= await updateUser(id,data)
   console.log(updateUse)
   if(updateUse === 'Not Found'){
      errorResponse.error='Update is failed han not find the user.'
    return res
    .status(StatusCodes.NOT_FOUND)
    .json(errorResponse)
   }

   successResponse.message='User Update Is Success ';
   successResponse.data=updateUse
   res
    .status(StatusCodes.OK)
    .json(successResponse)


 }


async function getEmail(req, res) {
  try {
    console.log(req.body);
    if (!req.body.email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Empty value",
        error: " get/email must be pares a email",
        data: {},
      });
    }
    const users = await getByEmail(req.body.email);
    res.json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { info, getUsers, createUsers, getEmail ,updated  };
