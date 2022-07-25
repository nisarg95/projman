const{ MongoClient }= require('mongodb') 

async function main(){

    const uri = "mongodb+srv://nisargvaishnav:Nisarg$9501Cluster@cluster0.kfu13.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try{
        await client.connect();

        await listDatabases(client);

    } catch(e) {
        console.error(e);

    } finally {
        await client.close(); 
    } 
}

main().catch (console.error); 

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    databasesList.database.forEach(db => {
        console.log (`-${db.name}`); 
    });
}