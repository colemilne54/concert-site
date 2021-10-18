import express from "express"
import cors from "cors"
import concerts from "./api/concerts.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/concerts", concerts)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app