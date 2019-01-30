const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routerLinks = require("./app/links");
const modelLinks = require("./models/links");

const config = require("./config");


mongoose.connect(config.db.url + '/' + config.db.name, { useNewUrlParser: true });
const db = mongoose.connection;


const app = express();

const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());


db.once('open', () => {
    console.log('Mongoose connected!');

    app.use('/links', routerLinks);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});

app.get('/:shortUrl',async (req,res)=>{
    let data = req.params.shortUrl;

    if(data.length === 7){
        try {
            let results = await modelLinks.findOne({'shortUrl': data});
            if (results) res.status(301).redirect(results.originalUrl);
            else res.status(404).send({"Error": "Not found"});
        }
        catch (e) {
            res.status(500).send(e);
        }
    }
    else{
        res.status(404).send({"Error":"Not found"});
    }
});

