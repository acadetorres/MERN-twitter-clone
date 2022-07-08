import {meta} from "../../collections_queries/meta.js";
import  findAll  from "../../collections_queries/signin_repository.js";


export default async function findAllUsers(response) {
    findAll(function (data, status) {
        response(data, meta('ok', status))
    })
}