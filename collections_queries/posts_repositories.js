import { CollectionHandler } from "./collection.js"
import { meta, dataMeta } from "./meta.js"

const PostsDocument = "posts"

const handler = new CollectionHandler()

export function getAllUserPosts(userId, result) {
    handler.findAll(PostsDocument, (res) => {
        result(dataMeta(res, meta("Fetched", 200)))
    }, {userId : userId})
}

export function insertPost(userId, message, response) {
    handler.insertToCollection({
        userId : userId,
        message : message,
        date : new Date()
    }, PostsDocument, (result)=> {
        response(dataMeta(result, meta("Successfully added message", 200)))
    })
}