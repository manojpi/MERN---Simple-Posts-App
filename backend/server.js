
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// importing mongoose module
const mongoose = require("mongoose");

const options = {
    keepAlive: true,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// mongodb+srv://<username>:<password>@cluster0.6vk0qgz.mongodb.net/?retryWrites=true&w=majority
const dbUrl = `mongodb+srv://vscodeuser:vscodeuser@cluster0.wk5xfsw.mongodb.net/?retryWrites=true&w=majority`;

// Mongo DB connection
mongoose.connect(dbUrl, options, (err) => {
    if (err) console.log(err);
});

// Validate DB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo DB Connected successfully");
});

// Schema for Post
let Schema = mongoose.Schema;
let postSchema = new Schema(
    {
        value: {
            type: String,
        }
    },
    { timestamps: true }
);
let PostModel = mongoose.model("post", postSchema);

app.get('/', (req, res) => {
    res.send('Your are lucky!! server is running...');
});

app.get('/posts', async (req, res) => {
    try {
        let posts = await PostModel.find();
        res.status(200).json({
            status: 200,
            data: posts,
        });
        console.log(posts)
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

app.post('/posts', async (req, res) => {
    console.log(req.body)
    const inputPost = req.body;

    console.log(inputPost);
    let posts = await PostModel.find();
    const matchingPosts = posts.filter(post => post.id === inputPost.id).length;
    if (matchingPosts) {
        res.status(500);
        console.error(`Post with id:${inputPost.id} already exists`);
    }
    else {
        try {
            console.log('input Post:', inputPost.value);
            let post = new PostModel(inputPost);
            post = await post.save();
            res.status(200).json({
                status: 200,
                data: post,
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message,
            });
        }
    }
});

app.delete("/posts/:postsID", async (req, res) => {
    try {
        let book = await PostModel.findByIdAndRemove(req.params.postsID);
        if (book) {
            let posts = await PostModel.find();
            res.status(200).json({
                status: 200,
                message: "Book deleted successfully",
                data: posts
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "No Book found",
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});

app.listen(3001);