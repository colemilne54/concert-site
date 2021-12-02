import express from "express"
import path from "path"
import __dirname from "path"
import cors from "cors"
import concerts from "./api/concerts.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/concerts", concerts)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))



// app.use(express.static(path.join(__dirname, '/frontend/build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

export default app