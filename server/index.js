const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute=require("./Routes/messageRoute")
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
 // Mount the userRoute under /api/users
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.get('/', (req, res) => {
    res.send("WELCOME TO CHAT APP");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo connected");
});
