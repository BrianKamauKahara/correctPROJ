import express from 'express'
import cors from 'cors'
import router from './appRoutes/routes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(cors({
    origin: 'https://displaylivebrinkkk.netlify.app', // Allow frontend origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'] // Allow specific headers
  }))
/* app.use(express.static(`public`))
app.use(express.static('app'))
app.use(express.static('src'))
 */
app.use('/',router)



app.listen(process.env.PORT, () => {
    console.log('Listening on port 4000')
})