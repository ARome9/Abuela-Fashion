const db = require('./index.js');

getProducts = (page=1, count=5, callback) => {
  const query = `SELECT * FROM products LIMIT ${count}`;
  db.query(query)
    .then((response) => {
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
  // const styleQuery = `SELECT styles.product_id, json_agg(json_build_object('style_id', styles.style_id, 'name', styles.name,'original_price', styles.original_price, 'default?', styles."default?", 'photos', (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) FROM photos WHERE style_id = styles.style_id) WHERE style_id = styles.style_id GROUP BY style_id) AS results FROM styles WHERE styles.product_id = ${productId} GROUP BY product_id`;

  const styleQuery = `SELECT product_id, json_agg(json_build_object('style_id', style_id, 'name', name, 'original_price', original_price, 'default?', "default?")) AS results FROM styles WHERE product_id = ${productId} GROUP BY product_id`;

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