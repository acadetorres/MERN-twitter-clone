import { meta } from "../../../collections_queries/meta.js"
import { insertPost } from "../../../collections_queries/posts_repositories.js"

export default function addUserPost(userId, message, response) {
    insertPost(
        userId,
        message,
        (res) => {
            response(res)
        })
}