import { Caterogy } from "@/models/Category"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); 
  }

  const parentId = req.query.parentId;

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const childCategories = await Caterogy.find({ parent: parentId }).skip(skip).limit(limit)    
    res.status(200).json(childCategories);
  } catch (error) {
    console.error("Error fetching child categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
