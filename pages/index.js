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
     
       <WhyUs/>
      <Footer></Footer>
    </div>
  );
}






export  async function getServerSideProps(){
  console.log('getServerSideProps start');


  await mongooseConnect();

   const productItems=await Product.find({},null,{sort:{'_id':1}})

   const allcategories = await Caterogy.find({}, null, { sort: { '_id': 1 } });

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
const productsOnSale = await Product.find({sale: true },null,{sort:{'_id':-1},limit:8}).select('title price images discount properties');
  


  return {

                                          
    props:{
      productsOnSale: JSON.parse(JSON.stringify(productsOnSale)),
      allcategories:JSON.parse(JSON.stringify(allcategories)),

      categories:JSON.parse(JSON.stringify(categories)),


    },
  }

}