import  Comment  from "../../models/Comment";
import { User } from "../../models/User";
import { Product } from "../../models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();
  if (req.method === "POST") {
    console.log(req.body);

    const { comment, rating, productId, userName } = req.body;
    const user = await User.findOne({ name: userName });

    const newComment = new Comment({
      comment,
      rating,
      product: productId,
      user: user._id,
    });

    const savedComment = await newComment.save();

    const existingComments = await Comment.find({ product: productId });

    const totalRatings = existingComments.reduce((total, comment) => total + comment.rating, 0);
    const avgRating = totalRatings / existingComments.length;

    const product = await Product.findByIdAndUpdate(productId, { rating: avgRating });
    res.status(201).json(savedComment);
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
