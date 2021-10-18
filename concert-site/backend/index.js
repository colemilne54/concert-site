import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.port || 8000

MongoClient.connect(
    proccess.env.CONCERTS_DB_URI,
    {
        poolSize: 20,
        wtimout: 2500,
        useNewUrlParse: true 
    }
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
