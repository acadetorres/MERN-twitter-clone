import { getAllUserPosts } from '../collections_queries/posts_repositories.js'
import registerUser, { signIn } from './signin/signin.js'
import addUserPost from './users/posts/posts.js'
import findAllUsers from './users/users.js'

export function startRoutes(app) {


    app.post('/registration/register', (req, res) => {
        const body = req.body
        registerUser(body.userName, body.name, body.password, (data) => {
            res.status(data.meta.status).send(data)
            // res.status(200).send(req.body)
        })
    })

    app.post('/users/signIn', (req, res) => {
        const body = req.body
        signIn(body.userName, body.password, (data) => {
            res.status(data.meta.status).send(data)
        })
    })

    app.post('/users/postContent', (req, res) => {
        const body = req.body
        addUserPost(body.userId, body.message, (data) => {
            res.status(data.meta.status).send(data)
        })
    })

    app.post('/users/posts', (req, res) => {
        const body = req.body
        getAllUserPosts(body.userId, (data) => {
            res.status(data.meta.status).send(data)
        })
    })

    app.get('/users/findAll', (req, res) => {
        findAllUsers((data) => {
            console.log(data.meta.status)
            res.status(data.meta.status).send(data)
        })
    })

    app.get('/', (req, res) => {
        res.status(404).send('Hello World!')
    })

}