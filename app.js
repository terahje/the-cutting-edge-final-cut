const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json);

app.get('/', (req, res, next) => {
    res.send('Hello World');
})

// app.listen(3001);

app.listen(PORT, () => {
    console.log(`🌎 API server running on port ${PORT}!`);
});




