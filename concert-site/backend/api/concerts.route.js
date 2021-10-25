import express from "express"
import ConcertsController from "./concerts.controller.js"

const router = express.Router()

router.route("/genres").get(ConcertsController.apiGetConcertGenres)

router
    .route("/").get(ConcertsController.apiGetConcerts)
    .post(ConcertsController.apiPostConcert)
    .put(ConcertsController.apiUpdateConcert)
    .delete(ConcertsController.apiDeleteConcert)

export default router