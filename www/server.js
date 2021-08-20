const express = require('express');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

//const concepts = require('./public/concepts');
const images = require('./public/data/images');

const path = require('path');

app.use(cors());

async function connectdb() {
    const uri = "mongodb+srv://christer:Ice278787@oerdev.bqfcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });

    await client.connect();

}
connectdb().catch(console.error);


// en static folder
app.use(express.static(path.join(__dirname, 'public')));


//endpoint for all images
app.get('/api/', (req, res) => {
    res.json(images);

});

app.get('/api/content/:id', (req, res) => {
    const found = images.some(image => image.id === parseInt(req.params.id));

    if (found) {
        res.json(images.filter(function(obj) {
            return obj.id === parseInt(req.params.id);
        }));
    } else {
        res.status(400).json({ msg: "Item not found" });
    }
});
//endpoint listing all books in a language that are featured
app.get('/api/featured/:language', (req, res) => {
    const found = images.some(image => image.inlanguage === req.params.language);

    if (found) {
        res.json(images.filter(function(obj) {
            return obj.inlanguage === req.params.language && obj.featured === "yes";
        }));
    } else {
        res.status(400).json({ msg: "Language not found" });
    }
});
//endpoint for all images that starts with ....
app.get('/api/title/:title', (req, res) => {
    let matches = images.filter(image => {
        const regex = new RegExp(`${req.params.title}`, 'gi');
        return image.title.match(regex);
    });

    if (matches) {
        res.json(matches);
    } else {
        res.status(400).json({ msg: "No images not found" });
    }

});

app.get('/api/titledb/:title', (req, res) => {
    async function findResultsUi() {

        const uri = "mongodb+srv://christer:Ice278787@oerdev.bqfcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });

        await client.connect();

        /* [
             { $search: { index: 'serchimages', text: { query: req.params.title, path: { wildcard: '*' } } } }
         ]);*/

        const cursor = client.db("edupix").collection("collection").aggregate(

            [
                { $match: { title: { $regex: req.params.title } } },
                { $group: { _id: "$id" } },
                { $sort:  { _id: -1 } }

            ]);

        const results = await cursor.toArray();

        res.json(results);
        console.log(results);
        return;
    }

    findResultsUi().catch(console.error);

});
//const found = images.some(image => image.title === req.params.title);

//  if (found) {
//      res.json(images.filter(image => image.title === req.params.title));
//  } else {
//      res.status(400).json({ msg: "No images not found" });
//  }


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});