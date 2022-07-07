import { CollectionHandler } from "./collection.js"

const UsersDocuments = "users"

const handler = new CollectionHandler()

registerUser("001", "Adrian", "Superman2")


function findAll() {
    const register = handler.findAll(UsersDocuments)
}

async function registerUser(userName, name, password) {

    const checkUser = await handler.findSingle({ userName: userName }, UsersDocuments, async function (result) {
        if (result == undefined) {
            console.log("Empty userName")

            await handler.insertToCollection({
                userName: userName,
                name: name,
                password: password
            },
                UsersDocuments)

                handler.closeClient()

        } else {
            console.log("User Exists")
            
            handler.closeClient()
        }
    })


}