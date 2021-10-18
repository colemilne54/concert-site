import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
// 32:40, still need to figure out the reviews portion
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.port || 8000

MongoClient.connect(
    process.env.CONCERTS_DB_URI,
    {
        maxPoolSize: 20,
        wtimeoutMS: 2500,
        useNewUrlParser: true }
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        })
    })
