import { NextResponse } from "next/server";

const { MongoClient, ServerApiVersion } = require('mongodb');


export async function GET(request) {
  
  const uri = "mongodb+srv://npatodia085:JKck49tQKbHN5Dhs@nikhil.zcglvls.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
 
  try {
      let query = request.nextUrl.searchParams.get("query")
      console.log(query)
      const database = client.db('stock');
      const inventory = database.collection('inventory');
      const products = await inventory.aggregate([
        {
          $match: {
            $or: [
              { productname: { $regex: query, $options: "i" } }, // Case-insensitive partial match on productName
           ]
          }
        }
      ]).toArray();
      return NextResponse.json({success:true,  products });
  } catch (error) {
      console.error("Error:", error);
      return NextResponse.error(500, "Internal Server Error");
  } finally {
      await client.close();
  }
}