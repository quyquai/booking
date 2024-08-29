const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotel');
const roomRoutes = require('./routes/room');
const transactionRoutes = require('./routes/transaction');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

app.use( authRoutes);
app.use( '/admin',adminRoutes);
app.use('/hotels', hotelRoutes);
app.use(roomRoutes);
app.use('/transactions', transactionRoutes);

mongoose.connect('mongodb+srv://quyquai96:H4t3vHKAPpyVrN4u@cluster0.n3z6whl.mongodb.net/asm2?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(5000);
  })
  .catch(err => console.log(err));
