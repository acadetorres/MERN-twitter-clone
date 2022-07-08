import { CollectionHandler } from "./collection.js"
import { meta, dataMeta } from "./meta.js"

const PostsDocument = "posts"

const handler = new CollectionHandler()

export function getAllUserPosts(userId, result) {
    handler.findAll(PostsDocument, (res) => {

    })
}

export function addUserPost(post) {
    handler.insertToCollection({
        userId : ""
    }, PostsDocument, (result)=> {

    })
}