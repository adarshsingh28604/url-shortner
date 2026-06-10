import express from "express";
import URL from "../models/urlModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect('/login')

    const allUrls = await URL.find({createdBy: req.user._id});

    return res.render("home", {
        urls: allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

export default router;



























// import express from "express";
// import URL from "../models/urlModel.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//     const allUrls = await URL.find({});

//     return res.render("home", {
//         urls: allUrls,
//     });
// });

// router.get("/signup", (req, res) => {
//     return res.render("signup");
// });

// router.get("/login", (req, res) => {
//     return res.render("login");
// });

// export default router;


























// import express from "express";
// const router = express.Router();


// router.get('/' , async (req,res) => {
//        const allUrls = await URL.find({});
//     return res.render('home', {
//         urls: allUrls
//     })
// })

// router.get('/signup', (req,res)=>{
//     return res.render("signup")
// })
// router.get('/login', (req,res)=>{
//     return res.render("login")
// })


// export default router ; 