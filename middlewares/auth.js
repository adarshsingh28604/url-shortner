import { getUser } from "../service/auth.js";

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect("/login");
    }

    const user = await getUser(userUid);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();

}

async function checkAuth(req,res,next){
         const userUid = req.cookies?.uid;

    const user = await getUser(userUid);

   
    req.user = user;
    next();
}




export  {restrictToLoggedinUserOnly, checkAuth};