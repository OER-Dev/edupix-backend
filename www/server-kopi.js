const express = require('express');
const cors = require('cors');
const app = express();
//const concepts = require('./public/concepts');
const images = require('./public/data/images');

const path = require('path');

app.use(cors());

// en static folder
app.use(express.static(path.join(__dirname, 'public')));

//endpoint for all images
app.get('/api/', (req, res) => {
    res.json(images);

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
        const regex = new RegExp(`^${req.params.title}`, 'gi');
        return image.title.match(regex);
    });

    if (matches) {
        res.json(matches);
    } else {
        res.status(400).json({ msg: "No images not found" });
    }


    //const found = images.some(image => image.title === req.params.title);

    // if (found) {
    //    res.json(images.filter(image => image.title === req.params.title));
    //} else {
    //    res.status(400).json({ msg: "No images not found" });
    //}

});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});