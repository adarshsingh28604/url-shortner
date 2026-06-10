// import express from "express";
// import path from "path";
// import connectToMongoDB from "./connect.js";
// import urlRoute from "./routes/urlRoutes.js";
// import staticRouter from "./routes/staticRouter.js"
// import { restrictToLoggedinUserOnly,checkAuth} from "./middlewares/auth.js"
// import URL from "./models/urlModel.js";
// import userRoute from "./routes/user.js"
// import cookieParser from "cookie-parser"



// const app = express();
// const PORT = 8003;


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
// .then(()=> console.log("mongoDb connected"));

// app.set("view engine", "ejs");
// app.set('views', path.resolve('./views'))

// app.get("/test", async(req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home', {
//         urls: allUrls,
//     })
// })

// app.use(cookieParser());


// app.use("/user", userRoute);
// app.use("/", checkAuth , staticRouter);

// app.get('/url/:shortId', async (req,res)=> {
// const shortId = req.params.shortId;
// const entry = await URL.findOneAndUpdate(
//     {
//         shortId,
//          createdBy: req.user?._id 
//     },
//     {
//         $push: {
//             visitHistory: {
//                 timestamp: Date.now()
//             }
//         }
//     }
//     ,   { returnDocument: 'after' }
// )
// if (!entry) {
//     return res.status(404).send("Short URL not found");
// }
// res.redirect(entry.redirectURL);
// })

// app.use("/url", restrictToLoggedinUserOnly , urlRoute);


// app.listen(PORT , () => console.log(`server started at PORT ${PORT}`))

import express from "express";
import path from "path";
import  connectToMongoDB from "./connect.js";   
import urlRoute from "./routes/urlRoutes.js";
import staticRouter from "./routes/staticRouter.js";
import { restrictToLoggedinUserOnly, checkAuth } from "./middlewares/auth.js";
import URL from "./models/urlModel.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());   

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log("mongoDb connected"));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));


app.get("/test", restrictToLoggedinUserOnly, async (req,res)=>{
    const allUrls = await URL.find({
        createdBy: req.user._id  
    });

    return res.render('home', {
        urls: allUrls,
    });
});


app.use("/user", userRoute);
app.use("/", checkAuth , staticRouter);


// ⚠️ IMPORTANT: redirect me createdBy check hata diya
// kyunki public access hona chahiye
app.get('/url/:shortId', async (req,res)=> {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },   
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
        { returnDocument: 'after' }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});



app.use("/url", restrictToLoggedinUserOnly , urlRoute);


app.listen(PORT , () => console.log(`server started at PORT ${PORT}`));