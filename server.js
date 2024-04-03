const express = require('express');
const app = express();
const cors = require('cors');
const logger = require("morgan");
const connectToDb = require('./src/configs/db.config');
const articleRoutes = require('./src/routes/article.routes');
require("dotenv").config();

const port = process.env.PORT || 5000;

// Middleware ______________________

const corsOptions = {
    origin: 'http://localhost:3000', // frontend URI (ReactJS)
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(logger("dev"));

// _________________________________

// Connect to MongoDB ______________

connectToDb();

// Routes __________________________

app.get('/api/v1/hello', (req, res) => {
    res.status(200).json({ message: "Node.js Express testing with Jest and SuperTest" });
});

app.use("/api/v1/articles", articleRoutes);

// Error handling middleware ________
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// _________________________________

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Note: that you have to export app like this
module.exports = app;