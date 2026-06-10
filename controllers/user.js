import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";


// 🔹 SIGNUP
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    // session create
    const sessionId = uuidv4();

    // store user
    setUser(sessionId, { email });

    // cookie set
    res.cookie("uid", sessionId);

    return res.redirect("/");
}


// 🔹 LOGIN
async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", {
            error: "invalid Username or password",
        });
    }



   const token =  setUser(user);

    res.cookie("uid", token);

    return res.redirect("/");
}


// 🔹 LOGOUT
async function handleUserLogout(req, res) {
    res.clearCookie("uid");
    return res.redirect("/login");
}


export { handleUserSignup, handleUserLogin, handleUserLogout };