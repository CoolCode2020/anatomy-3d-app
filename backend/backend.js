/**
 * This is the backend server for the application.
 * It is a simple Express server that serves a test API endpoint.
 * The server is configured to allow CORS requests from the frontend application.
 * The server listens on port 8080.
 */
const express  = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    //methods: ['GET', 'POST'],
    //allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));




app.get("/api", (req, res) => {
    res.json({test:["Harry","test"]});
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});


