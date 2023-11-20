import { Category } from "../../models/Category"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); 
  }

  const parentId = req.query.parentId;

  try {
    
    const childCategories = await Category.find({ parent: parentId });
    res.status(200).json(childCategories);
  } catch (error) {
    console.error("Error fetching child categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } 
}