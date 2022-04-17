const express = require('express');
const dbConnection = require('./DB/db');
const app = express();
const port = 5000;
require("dotenv").config();
const userRoutes=require("./src/users/routes/userRoutes")
const adminRoutes= require("./src/admins/routes/adminRoutes")
const postRoutes= require("./src/posts/routes/postsRoutes")
const reportRoutes=require("./src/reportPost/routes/reportRoutes");
const runJobs = require('./common/services/jobs');

app.use(express.json());
app.use('/uploads',express.static('uploads'))
dbConnection();
runJobs()

app.use(userRoutes,adminRoutes,postRoutes,reportRoutes);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))