const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
dotenv.config();
const {Product}=require('./models/Product')
const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY);
const index = client.initIndex('products');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  Product.find({}, function(err, products) {
    if (err) {
      console.error(err);
    } else {
      const records = products.map(product => {
        return {
          objectID: product._id.toString(),
          title: product.title,
          description: product.description,
          details: product.details,
          price: product.price,
          images: product.images,
          category: product.category.toString(),
          sale: product.sale,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          countSales: product.countSales,
          properties: product.properties
        };
      });
      index.saveObjects(records, function(err, content) {
        if (err) {
          console.error(err);
        } else {
          console.log(content);
        }
      });
    }
  });
});

