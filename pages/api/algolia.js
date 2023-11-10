// pages/api/algolia.js
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY);
const index = client.initIndex('products');

export { client, index };
