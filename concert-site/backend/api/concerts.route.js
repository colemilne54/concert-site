import express from "express"
import ConcertsController from "./concerts.controller.js"

const router = express.Router()

router.route("/").get(ConcertsController.apiGetConcerts)
 
export default router