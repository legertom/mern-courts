// Set up the Express server, import required depenedencies, and connect to MongoDB. Also define the routes.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const courtsRouter = require('./routes/courts');
const usersRouter = require('./routes/users');

app.use('/courts', courtsRouter);
app.use('/users', usersRouter);

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
