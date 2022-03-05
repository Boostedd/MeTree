// Initialize express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// Get firebase admin and initialize firebase
const admin = require('firebase-admin');
var crypto = require('crypto');
const serviceAccount = require('./serviceAccount.json');

app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const treedb = db.collection('trees');


app.get("/get/tree/:id", async (req,res) => {
    treedb.doc(req.params.id).get().then(doc => {
        if(doc.exists){
            const data = {title: doc.get("title"), description: doc.get("description"), links: doc.get("links")};
            res.send(data);
        }else{
            res.sendStatus(404);
        }
    });
});

app.post("/create/tree", async (req,res) => {
    try{
        const { id, title, description, links, password} = req.body;
        const doc = treedb.doc(id);
        if(doc.exists) res.sendStatus(409)
        const data = {title: title, description: description, links: links, password: crypto.createHash('sha256').update(password).digest('hex')};
        await doc.set(data);
        res.send(200);
    }catch(e){
        res.send(e);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening on da port da 3k");
})
