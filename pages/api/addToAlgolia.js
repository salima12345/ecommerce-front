import { mongooseConnect } from '@/lib/mongoose';
import algoliasearch from 'algoliasearch';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
   const connection = await mongooseConnect();
   const products = await Product.find().exec();
   
   const algoliaObjects = products.map(product => {
       return {
           objectID: product._id,
           title: product.title,
           description: product.description,
           price: product.price,
           category:product.category,
           properties:product.properties,
           colors:product.colors,

       };
   });

   const algoliaClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY);
   const index = algoliaClient.initIndex('products');
   index.saveObjects(algoliaObjects, { autoGenerateObjectIDIfNotExist: true });

   res.status(200).json({ message: 'Products added to Algolia' });
}
