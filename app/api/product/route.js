import { NextResponse } from "next/server";

const { MongoClient, ServerApiVersion } = require('mongodb');


export async function GET(request) {
  
  const uri = "mongodb+srv://npatodia085:JKck49tQKbHN5Dhs@nikhil.zcglvls.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
 
  try {
      const database = client.db('stock');
      const inventory = database.collection('inventory');
      const query = {    };
      const products = await inventory.find(query).toArray();
      
      return NextResponse.json({success:true,  products });
  } catch (error) {
      console.error("Error:", error);
      return NextResponse.error(500, "Internal Server Error");
  } finally {
      await client.close();
  }
}
export async function POST(request) {

 const uri = "mongodb+srv://npatodia085:JKck49tQKbHN5Dhs@nikhil.zcglvls.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

    let body =await request.json()
    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');
        // Query for a movie that has the title 'Back to the Future'
        const product = await inventory.insertOne(body);
        return NextResponse.json({products: product})
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    
}