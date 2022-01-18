const express = require('express');
const path = require('path');
const router = require('./routes.js');
const cors = require('cors');
const app = express();
// const URL = require('./controllers/url.js');
const URL = 'http://localhost:4000';

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/api', router);

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
