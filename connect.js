const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://admin:emorymaps2022@aws-emorymaps-db.tj1y7al.mongodb.net/?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect(); //END COPY
 
        // Make the appropriate DB calls
        // List databases 
        await  listDatabases(client);

        // Add a sample to the table
        // await createListing(client,
        //     {
        //         name: "Woodruff Residential Center",
        //         alt_name: ["Woodruff Hall", "Woody's"],
        //         coord: "33.79730640698596, -84.3215212755151",
        //         tags: ["food", "residence hall"]
        //     }
        // );

        // await createListing(client,
        //     {
        //         name: "Few Hall",
        //         alt_name: ["Few"],
        //         coord: "33.79730640698596, -84.3215212755151",
        //         tags: ["residence hall"],
        //         rooms: 5
        //     }
        // );

        // Query one sample
        // await findOneListingByName(client, "Cox Hall");

        // Query for tags
        await findListingsByTag(client, "residence hall"); //GET THESE TOO



    } catch (e) { 
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// function to add one sample to database
async function createListing(client, newListing){
    const result = await client.db("integration-test").collection("buildings").insertOne(newListing); // integration-test is name of db and buildings is name of connection
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// functions to query from db
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("integration-test").collection("buildings").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function findListingsByTag(client, tag) {
    const cursor = await client.db("integration-test").collection("buildings").find(
        { 
            tags: {$in : [tag]}
        }
        );

    const result = await cursor.toArray();

    // console.log(result)

    if (result.length > 0) {
        // console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        // console.log(result);

        result.forEach((r) => {
            console.log(r);
        })
    } else {
        console.log(`No listings found with the tag '${rm}'`);
    }
}


// async function findListingsWithTags(client, {
//     minimumNumberOfBedrooms = 0,
//     minimumNumberOfBathrooms = 0,
//     maximumNumberOfResults = Number.MAX_SAFE_INTEGER
// } = {}) {
//     const cursor = client.db("integration-test").collection("buildings").find(
//                             {
//                                 bedrooms: { $gte: minimumNumberOfBedrooms },
//                                 bathrooms: { $gte: minimumNumberOfBathrooms }
//                             }
//                             ).sort({ last_review: -1 })
//                             .limit(maximumNumberOfResults);

//     const results = await cursor.toArray();

//     if (results.length > 0) {
//         console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
//         results.forEach((result, i) => {
//             date = new Date(result.last_review).toDateString();

//             console.log();
//             console.log(`${i + 1}. name: ${result.name}`);
//             console.log(`   _id: ${result._id}`);
//             console.log(`   bedrooms: ${result.bedrooms}`);
//             console.log(`   bathrooms: ${result.bathrooms}`);
//             console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
//         });
//     } else {
//         console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
//     }
// }