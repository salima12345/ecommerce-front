import { mongooseConnect } from "../../lib/mongoose";
import { Order } from "../../models/Order";
import { Product } from "../../models/Product";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SK);


export default  async function handler(req,res){
  console.log('Request body:', req.body);
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
      }
    const {
        name,email,city,
        postalCode,streetAddress,country,
        cartProducts,
      } = req.body;
      await mongooseConnect();
      const productIds = cartProducts.map(product => product.id);
      const uniqueIds = [...new Set(productIds)];
      
     
      const productInfos= await Product.find({_id:uniqueIds});
      const productIdsInSession = productInfos.map((productInfo) =>
      productInfo._id.toString()
    );
      let line_items=[];
      for (const productId of uniqueIds) {
        const productInfo = productInfos.find(p => p._id.toString() === productId);

        const quantity = productIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
          line_items.push({
            quantity,
            price_data: {
              currency: 'USD',
              product_data: {
                name: productInfo.title,

                metadata: {
                  productId: productId,
                },
              },
              unit_amount: quantity * productInfo.price * 100,
            },
          });
    
          console.log('Added line_item for product:', productInfo.title);
        }
      }
      const orderDoc = await Order.create({
        line_items,name,email,city,postalCode,
        streetAddress,country,paid:false,
      })
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
        success_url: "https://ecommerce-front-delta-woad.vercel.app/" + '/cart?success=1',
        cancel_url: "https://ecommerce-front-delta-woad.vercel.app/" + '/cart?canceled=1',
        metadata: {orderId:orderDoc._id.toString(),test:'ok', productIds: productIdsInSession.join(','),},
      });
    
      res.json({
        url:session.url,
      })
      
}
