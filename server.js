const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const User = require('./models/User');

const dbURI = 'mongodb+srv://olatigbejoel15:Balikis15@cluster0.pt56s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));


// MIDDLEWARE
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoute');
app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/about', (req, res) => {
    res.send("Hello!");
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

