import { NextResponse } from "next/server";

const { MongoClient } = require('mongodb');
export async function POST(request) {

    const uri = "mongodb+srv://npatodia085:JKck49tQKbHN5Dhs@nikhil.zcglvls.mongodb.net/?retryWrites=true&w=majority";
   // Create a MongoClient with a MongoClientOptions object to set the Stable API version
   const client = new MongoClient(uri);
   
   const {action, productname, initialQty } = await request.json();
       try {
           const database = client.db('stock');
           const inventory = database.collection('inventory');
           
           const query = { productname: productname };
           let newQty = action == 'plus'? (parseInt(initialQty) +1) : (parseInt(initialQty) -1) ;
           const update = {
               $set: {
                quantity: newQty,
               },
           };

           const result = await inventory.updateOne(query, update);
           return NextResponse.json({success:true,  message: `Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)` });
       }finally {
           // Ensures that the client will close when you finish/error
           await client.close();
         }
       
   }