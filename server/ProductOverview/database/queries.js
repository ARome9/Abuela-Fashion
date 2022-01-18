const db = require('./index.js');

getProducts = (page=1, count=5, callback) => {
  const query = `SELECT * FROM products LIMIT ${page * count}`;
  db.query(query)
    .then((response) => {
      console.log(response);
      callback(null, response);
    })
    .catch((err) => {
      callback(err, null);
    });
};

getProductInfo = (productId, callback) => {
  const infoQuery = `SELECT products.*, json_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features FROM products LEFT JOIN features ON products.id = features.product_id WHERE products.id = ${productId} GROUP BY products.id, products.*`;

  db.query(infoQuery)
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => {
      callback(err, null);
    });
};

getStyles = (productId, callback) => {
  const styleQuery = `SELECT product_id, json_agg(json_build_object('style_id', style_id, 'name', name, 'original_price', original_price, 'default?', "default?", 'photos', (SELECT json_agg(json_build_object('thumbnail', thumbnail_url, 'url', url)) FROM photos WHERE style_id = styles.style_id), 'skus', (SELECT json_object_agg(sku_id, json_build_object('quantity', quantity, 'size', size)) AS skus FROM skus WHERE style_id = styles.style_id GROUP BY style_id))) AS results FROM styles WHERE styles.product_id = ${productId} GROUP BY product_id`;

  db.query(styleQuery)
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => {
      callback(err, null);
    })
};

module.exports = {
  getProducts,
  getProductInfo,
  getStyles
}