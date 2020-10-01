const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { check, validationresult } = require('express-validator/check');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
// app.use(express.json());
app.use(express.json({ extended: false }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true , useCreateIndex:true}
);
const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('MongoDB database connection established successfully')
})

// const eventsRouter = require('./routes/events');
// const usersRouter = require('./routes/users');
// const authRouter = require('./routes/auth');
// const profileRouter = require('./routes/profile')

app.use('/events', require('./routes/events'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));


app.listen(port, ()=> {
  console.log(`Server is running on port: ${port}`)
});
