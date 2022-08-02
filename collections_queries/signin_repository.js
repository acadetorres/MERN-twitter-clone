import { hashPassword, verifyPassword } from "../utils/password_crypt.js"
import { CollectionHandler } from "./collection.js"
import { meta, dataMeta } from "./meta.js"
// import meta from "./meta.js"

const UsersDocuments = "users"

const handler = new CollectionHandler()

// registerUser("001", "Adrian", "Superman2")


export default function findAll(response) {
    handler.findAll(UsersDocuments, (res) => {
        response(res)  
    })
}

export async function registerUserDB(userName, name, password, response) {

    await handler.findSingle({ userName: userName }, UsersDocuments, async (result) => {
        if (result == undefined) {
            console.log("Empty userName")

            hashPassword(password, async (hashedPassword) => {
                await handler.insertToCollection({
                    userName: userName,
                    name: name,
                    password: hashedPassword
                },
                    UsersDocuments,
                    (res) => {
                        response(dataMeta(res, meta("Successful Registration", 200)))

                        handler.closeClient()
                    })
            }
            )

        } else {
            console.log("User Exists")

            console.log(dataMeta({}, meta("User already exists", 200)))
            response(dataMeta({}, meta("User already exists", 200)))

            handler.closeClient()
        }
    })
}

export function userSignIn(userName, password, response) {

    handler.findSingle({ userName: userName }, UsersDocuments, ((res) => {
        if (res == undefined) {
            response(dataMeta({}, meta("User does not exist", 404)))

        } else {

            verifyPassword(password, res.password, (result) => {
                if (result) {
                    response(dataMeta(res, meta("Success", 200)))
                } else {
                    response(dataMeta({}, meta("Invalid Username/Password", 400)))
                }
            })
        }
        handler.closeClient()
    }))
}