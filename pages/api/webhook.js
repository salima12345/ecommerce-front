import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";
import { Product } from "@/models/Product";

const endpointSecret = "whsec_2327a0cb275615a98eb603ee860550f0bbb73b7f0b582f9a3039792ebe57bfcb";
export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log('Webhook received:', event.type);
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      const productIdsInSession = data.metadata.productIds.split(',');
      console.log('Order ID:', orderId);
      console.log('Payment Status:', paid);
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
        for (const productId of productIdsInSession) {
          if (productId) {
            await Product.findOneAndUpdate(
              { _id: productId },
              { $inc: { countSales: 1 } },
              { new: true }
            );
          }
        }}
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

