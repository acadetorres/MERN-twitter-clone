// import { startRoutes } from './src/routes/routes.ts';
import express from 'express';
// import { startRoutes } from 'startRoutes';
import helmet  from 'helmet';
import { startRoutes } from './routes/routes';
// const express = require('express')
// import registerUser, { signIn } from './routes/signin/signin.js'
// import addUserPost from './routes/users/posts/posts.js';
// import findAllUsers from './routes/users/users.js';

export const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(helmet())

startRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})