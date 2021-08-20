async function findResultsUi() {
    const uri = "mongodb+srv://christer:Ice278787@oerdev.bqfcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });

    await client.connect();

    //const cursor = client.db("edupix").collection("collection").aggregate([{ $search: { index: 'serchimages', text: { query: req.params.title, path: { wildcard: '*' } } } }])

    console.log(searchItem);

    const cursor = client.db("edupix").collection("collection")
        .find({ title: { $regex: req.params.title } }).sort({ title: -1 });

    const results = await cursor.toArray();

    res.json(results);
    console.log(results);
    return;
}

findResultsUi().catch(console.error);