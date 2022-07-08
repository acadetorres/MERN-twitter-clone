import { CollectionHandler } from "./collection.js"
import { meta, dataMeta } from "./meta.js"

const PostsDocument = "posts"

const handler = new CollectionHandler()

export function getAllUserPosts(userId, result) {
    handler.findAll(PostsDocument, (res) => {

}, 1)
}