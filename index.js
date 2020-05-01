// CREATE A LOCAL SERVER

//Loading library

const express = require('express');
const Datastore = require('nedb');

//Create app with express and open listening port
const app = express();
app.listen(3000, () => console.log('listening at 3000'));

//Create folder for static files
app.use(express.static('public'));

//Accepting json file and parsed
app.use(express.json({test: 123})); 


//Creat new database
const database = new Datastore('database.db');
database.loadDatabase();

//Handle GET request
app.get('/api', (request,response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
})

//Handle POST request from client
app.post('/api',(request,response) => {
    const adata = request.body;
    console.log('Incoming request');
    console.log(adata);

    // Insert timestamp
    const timestamp = Date.now();
    adata.timestamp = timestamp;

    //Insert POST from client to our database in server
    database.insert(adata);

    //Giving feedback to client
    response.json({
        status: `Success with ${adata.lat} and ${adata.lon}`,
        timestamp: timestamp,
        mood: adata.mood,
    });
});