import express from 'express';
// const express = require('express')
import registerUser, { signIn } from './routes/signin/signin.js'
import findAllUsers from './routes/users/users.js';

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.post('/registration/register', (req, res) => {
    const body = req.body
    registerUser(body.userName, body.name, body.password,  (data) => {
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

app.get('/users/findAll', (req, res) => {
    findAllUsers((data, meta)=> {

        res.status(meta.status).send({data : data, meta:meta})
    })
})

app.get('/', (req, res) => {
  res.status(404).send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
