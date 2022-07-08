import { meta,  dataMeta } from "../../collections_queries/meta.js"
import { registerUserDB } from "../../collections_queries/signin_repository.js";
import { userSignIn } from "../../collections_queries/signin_repository.js";


const CINVALID_REQUEST = 400;

const MINVALID_REQUEST = "Invalid Request!";

export default async function registerUser(userName, name, password, response) {
    if (!userName || !name || !password) {
        response(dataMeta({}, meta(MINVALID_REQUEST, CINVALID_REQUEST)))
        return
    }

    await registerUserDB(userName, name, password, (data) => {
        response(data)
    })

}

export async function signIn(userName, password, response) {
    if (!userName || !password) {
        response(dataMeta({}, meta(MINVALID_REQUEST, CINVALID_REQUEST)))
        return
    } 
    await userSignIn(userName, password, (res) => {
        response(res)
    })

    
}