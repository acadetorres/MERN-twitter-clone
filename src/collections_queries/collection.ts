import { Db, MongoClient } from "mongodb";
import { dataMeta, meta } from "./meta.js"

// const MongoClient = MongoClient();
const url = "mongodb://localhost:27017/";


let db : Db | any
let client : MongoClient | any

const loadClient = async () => {
  if (client) return client
  try {
    client = await MongoClient.connect(url)
  } catch (err) {
    throw err
  }
}


const loadDB = async () => {
  if (db) return db
  await loadClient().then(() => {
    try {
      db = client.db('twitter_clone')
      return db
    } catch (err) {
      throw err
    }
  })

  return db
}

// const promiseReject()


export class CollectionHandler {



  async createCollections(collectionName) {
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

   
  async findAll(collectionName, res, record, page, count) {

    try {
      await loadDB().then(() => {
        const query = record ?? {}
        const pageNumber = page ?? 0
        const limit = count ?? 0
        const skip = (pageNumber * limit) - limit
        db.collection(collectionName).find(query).skip(skip).limit(limit).toArray(function (err, result) {
          if (err) throw err;
          res(dataMeta(result, meta("Successful", 200)))
        });
      }).catch((err) => {
        throw err
      })
    } catch (err) {
      console.log(err.message)
      res(
        // meta.toMeta("DB ERROR", 500)
        dataMeta({}, meta("DB ERROR", 500))
      )
    }
  }

  async findSingle(record, collectionName, result) {
    try {
      await loadDB().then(() => {
        db.collection(collectionName).findOne(record, function (err, res) {
          if (err) throw err
          result(res)
        })
      })
    } catch (err) {
      console.log(err.message)
      result(
        // meta.toMeta("DB ERROR", 500)
        meta("DB ERROR", 500)
      )
    }
  }

  async insertToCollection(record, collectionName, response) {
    try {
      await loadDB().then(() => {
        db.collection(collectionName).insertOne(record, function (err, res) {
          if (err) throw err;
          response(dataMeta(record), meta("Successful insert", 200))
          // console.log("Document" + record);
        })
      })
    } catch (err) {
      console.log("err" + err.message)
      response(dataMeta({},meta("Failed insert", 200)))
    }
  }

  closeClient() {
    client.close()
    client = null
    db = null
  }
}