import { nanoid } from "nanoid"; 

import URL from "../models/urlModel.js";
async function handleGenerateNewShortURL(req , res){
    const body = req.body;
    if( !body || !body.url  ) return res.status(400).json({error : 'url is required'})
        

const shortID = nanoid(8);
const originalUrl = body.url.trim().replace(/\s+/g, "");
    await URL.create({
        shortId: shortID,
        redirectURL: originalUrl,
        visitHistory: [],
        createdBy: req.user._id,
    });

     const allUrls = await URL.find({createdBy: req.user._id});

    return res.render('home', { 
        id: shortID ,
        urls: allUrls,
    })
    // return res.json({id: shortID});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result  = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}


export { handleGenerateNewShortURL } ;
export { handleGetAnalytics } ;