const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config(); 


const connection = require('./util/db')
const routes = require('./routes/routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Connected to the database!');
});



app.use('/api/v1', routes);


app.listen(3000,()=>{
    console.log('connected')
});