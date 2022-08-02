import {meta} from "../../collections_queries/meta.js";
import  findAll  from "../../collections_queries/signin_repository.js";


export default function findAllUsers(response) {
    findAll( (data) => {
        response(data)
    })
}