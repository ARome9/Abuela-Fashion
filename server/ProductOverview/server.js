const express = require('express');
const app = express();
const { TOKEN } = require('./config.js');
const port = 4000;
const controller = require('./database/queries.js');

app.use(express.json());


app.get('/products', (req, res) => {
  let { page, count } = req.query;
  controller.getProducts(page, count, (err, results) => {
    if (err) {
      console.error('Err on line 17 of server.js', err);
    } else {
      console.log(results);
      res.send(results);
    }
  })
});

app.get('/products/:product_id', (req, res) => {
  console.log('REQ IN SDC SERVER', req)
  let { product_id } = req.params;
  console.log('PRODUCT ID', product_id);
  controller.getProductInfo(product_id, (err, results) => {
    if (err) {
      console.error("Err on line 27 in server.js", err);
    } else {
      res.send(results);
    }
  })
});

app.get('/products/:product_id/styles', (req, res) => {
  let { product_id } = req.params;

  controller.getStyles(product_id, (err, results) => {
    if (err) {
      console.error('Error: ', err);
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
