const User = {
    type:'object',
    properties:{
      id:{
        type:'integer',
        description:"User identification number",
        example:"1"
      },
      name:{
        type:'string',
        description:"User name",
        example:"Jaswant"
      },
      email:{
        type:"string",
        description:"User email address",
        example:"jaswant.dhayal@gmail.com"
      },
      dob:{
        type:"string",
        pattern: "^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4}$",
        description:"User date of birth in YYYY-MM-DD format" ,
        example:"1988-03-02"
      },
    },
  };

  const CreateUser = {
    type:'object',
    properties:{
      name:{
        type:'string',
        description:"User name",
        example:"Jaswant"
      },
      email:{
        type:"string",
        description:"User email address",
        example:"jaswant.dhayal@gmail.com"
      },
      dob:{
        type:"string",
        pattern: "^(3[01]|[12][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4}$",
        description:"User date of birth in YYYY-MM-DD format" ,
        example:"1988-03-02"
      },
    },
  };

export {
  CreateUser,
  User
};