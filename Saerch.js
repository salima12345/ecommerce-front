// search.js
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

const index = searchClient.initIndex('products'); 
export async function searchProducts(query) {
    try {
        console.log('Requête Algolia:', query)

      const { hits } = await index.search(query);
      console.log('Résultats de la recherche Algolia:', hits);

      return hits;
    } catch (error) {
        console.error('Algolia search error:', error);
      console.error('Erreur de recherche Algolia :', error);
      return [];
    }
  }
