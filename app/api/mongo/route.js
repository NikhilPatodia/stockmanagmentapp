import { NextResponse } from "next/server";

const { MongoClient } = require("mongodb");

export async function GET(request) {

   
    return NextResponse.json({"a": "hiii"})

    // // Replace the uri string with your connection string.
    // const uri = "mongodb+srv://npatodia085:JKck49tQKbHN5Dhs@nikhil.zcglvls.mongodb.net/?retryWrites=true&w=majority";
    // const client = new MongoClient(uri);
    // async function run() {
    //   try {
    //     const database = client.db('nikhil');
    //     const movies = database.collection('stocks');
    //     // Query for a movie that has the title 'Back to the Future'
    //     const query = {  };
    //     const movie = await movies.findOne(query);
    //   } finally {
    //     // Ensures that the client will close when you finish/error
    //     await client.close();
    //   }
    // }
}