import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/apiRoutes.js'

const app = express()

//app port
const port = process.env.APP_PORT

//CORS Policy
app.use(cors())

//JSON
app.use(express.json())

//load routes
app.use('/api/user', apiRoutes)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})