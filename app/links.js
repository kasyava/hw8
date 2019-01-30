const express = require("express");
const nanoid =  require("nanoid");


const dbLinks = require("../models/links");


const router = express.Router();


router.post("/", async (req, res) => {

    let linkData = req.body;


    let shortUrl;
    while(true) {
        shortUrl = nanoid(7);
        if( !await dbLinks.findOne({'shortUrl': shortUrl})){
            linkData.shortUrl = shortUrl;
            break;
        }
    }


    const dbUrl = new dbLinks(linkData);
    dbUrl.save()
        .then(result => res.send(result))
        .catch((e)=>res.send(e).status(500));


});

module.exports = router;