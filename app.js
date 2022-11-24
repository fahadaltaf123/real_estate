import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/apiRoutes.js'
// import fileUpload from 'express-fileupload';

const app = express()

//app port
const port = process.env.APP_PORT

//CORS Policy
app.use(cors())

// app.use(fileUpload());

//JSON
app.use(express.json({limit: '10mb'}));

// app.use(express.json())
app.use(express.static('uploads'))
//load routes
app.use('/api/user', apiRoutes)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})