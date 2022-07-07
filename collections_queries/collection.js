import {MongoClient} from "mongodb";

// const MongoClient = MongoClient();
const url = "mongodb://localhost:27017/";


let db
let client


const loadDB = async () => {
  if (db) return db
  try {
     client = await MongoClient.connect(url)
    db = client.db('twitter_clone')
  } catch (err) {
    throw err
  }
  return db
}


export class CollectionHandler {

  

  async createCollections(collectionName,) {
    await loadDB().then(() => {
      db.createCollection(collectionName, function (err, res) {
        if (err) throw err;
        console.log('Collection! ' + collectionName + "s created");
        // client.close()
      });
    })
    /* 
    user_profile
    users
    posts
    friends
    */
    
  }

  async findAll(collectionName) {
    await loadDB().then(() => {
      db.collection(collectionName).find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    })
    
  }

  async findSingle(record, collectionName, result) {
    await loadDB().then(() => {
      db.collection(collectionName).findOne(record, function(err, res) {
        if (err) throw err
        result(res)
      })
    })
  }

  async insertToCollection(record, collectionName) {
    await loadDB().then(()=> {
      db.collection(collectionName).insertOne(record, function (err, res) {
        if (err) throw err;
        // console.log("Document" + record);
      })
    })
  }

  closeClient() {
    client.close();
  }
}