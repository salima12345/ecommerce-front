import Featured from "../components/Featured";
import Header from "../components/Header";
import NewSalesCategory from "../components/NewSale";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";
import { Caterogy } from "../models/Category";
import TopSallers from "../components/TopSallers";
import MoreToLove from "../components/MoreToLove";
import WhyUs from "../components/WhyUs";
import Footer from "../components/Footer";


export default function HomePage({productsOnSale,allcategories,categories, mostSoldProducts ,productItems, targetDate}) {
  
  return (
    <div>
      <Header />
      <Featured  productsOnSale={productsOnSale} categories={categories}  allcategories={allcategories}/>
      <NewSalesCategory  productsOnSale={productsOnSale}  targetDate={ targetDate} />
      <TopSallers   mostSoldProducts ={ mostSoldProducts }/>
     
      <MoreToLove productItems={productItems}/>
       <WhyUs/>
      <Footer></Footer>
    </div>
  );
}
async function getMostSoldProducts() {
  try {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate);
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    const mostSoldProducts = await Product.find(
      {
        createdAt: { $gte: thirtyDaysAgo, $lte: currentDate },
        countSales: { $gt: 0 }, 
      },
      null,
      { sort: { countSales: -1 }, limit: 10 } 
    );

    return mostSoldProducts;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits les plus vendus :", error);
    return [];
  }
}




export  async function getServerSideProps(){
  console.log('getServerSideProps start');


  await mongooseConnect();

   const productItems=await Product.find({},null,{sort:{'_id':1}})
   console.log('Product items:', productItems);

   const allcategories = await Caterogy.find({}, null, { sort: { '_id': 1 } });
   console.log('All categories:', allcategories);

   // Nous réorganisons les catégories pour des modification au niveau des categories
//  sans supprimer ni réinsérer toutes les catégories.
// Cette approche économise du temps en évitant une suppression complète et une réinsertion.

const categoriesWithoutParent = await Caterogy.find(
  { parent: { $exists: false } },
  null,
  { sort: { '_id': 1 } }
).select('name image');

const latestCategoryWithoutParent = await Caterogy.findOne(
  { parent: { $exists: false } },
  null,
  { sort: { '_id': -1 } }
);

const insertIndex = 0;

const updatedCategoriesWithoutParent = categoriesWithoutParent.filter(
  (category) => category._id.toString() !== latestCategoryWithoutParent._id.toString()
);

const categories = [
  ...updatedCategoriesWithoutParent.slice(0, insertIndex),
  latestCategoryWithoutParent,
  ...updatedCategoriesWithoutParent.slice(insertIndex)
];  
const productsOnSale = await Product.find({sale: true },null,{sort:{'_id':-1},limit:8}).select('title price image discount');
  const DealsItem=await Product.find({ sale: true }).select('title price image discount');
  
    const mostSoldProducts = await getMostSoldProducts();

  const targetDate = new Date('2024-01-31T23:59:59').toISOString(); 

  return {

                                          
    props:{
      productsOnSale: JSON.parse(JSON.stringify(productsOnSale)),
      allcategories:JSON.parse(JSON.stringify(allcategories)),

      categories:JSON.parse(JSON.stringify(categories)),
      productItems:JSON.parse(JSON.stringify(productItems)),
      DealsItem:JSON.parse(JSON.stringify(DealsItem)),

      targetDate,
      mostSoldProducts: JSON.parse(JSON.stringify(mostSoldProducts)),

    },
  }

}