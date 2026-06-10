// const sessionIdToUserMap = new Map();

// function setUser(id , user){
//     sessionIdToUserMap.set(id,user);
// }


// function getUser(id ){
//     return sessionIdToUserMap.get(id);
// }

// export {getUser,setUser};

import jwt from "jsonwebtoken";
const secret = "piyush$123@$"

function setUser(user){
   return jwt.sign({
    _id: user._id,
    email: user.email,
   },secret);
}


function getUser(token ){ 
    if(!token) return null;
 try {  return jwt.verify(token , secret);
}catch(err){
    return null;
}}

export {getUser,setUser};