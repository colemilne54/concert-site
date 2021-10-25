import ConcertsDAO from "../dao/concertsDAO.js"

export default class ConcertsController {
    static async apiGetConcerts(req, res, next) {
        const concertsPerPage = req.query.concertsPerPage ? parseInt(req.query.concertsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.genre) {
            filters.genre = req.query.genre
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.bands) {
            filters.bands = req.query.bands
        }

        const { concertsList, totalNumConcerts } = await ConcertsDAO.getConcerts({
            filters,
            page,
            concertsPerPage,
        })

        let response = {
            concerts: concertsList,
            page: page,
            filters: filters,
            entries_per_page: concertsPerPage,
            total_results: totalNumConcerts,
        }
        res.json(response)
    }

    // TODO: GENERATE CONCERT ID
    static async apiPostConcert(req, res, next) {
        try {
            // const concertId = req.body.concert_id
            const venueName = req.body.venue_name
            const bands = req.body.bands
            const userInfo = {
                userName: req.body.user_name,
                userId: req.body.user_id
            }

            const ConcertResponse = await ConcertsDAO.addConcert(
                // concertId,
                venueName,
                bands,
                userInfo,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateConcert(req, res, next) {
        try {
            // const venueName = req.body.venue_name
            const bands = req.body.bands
            const concertId = req.body._id

            const ConcertResponse = await ConcertsDAO.updateConcert(
                // venueName,
                concertId,
                req.body.user_id,
                bands
            )
            
            var { error } = ConcertResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (ConcertResponse.modifiedCount === 0) {
                throw new Error(
                    "Unable to update concert - user may not be original poster",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteConcert(req, res, next) {
        try {
            const concertId = req.query.id
            const userId = req.body.user_id

            const ConcertResponse = await ConcertsDAO.deleteConcert(
                concertId,
                userId
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


    static async apiGetConcertGenres(req, res, next) {
        try {
          let genres = await ConcertsDAO.getGenres()
          res.json(genres)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }



    //   static async apiGetConcertById(req, res, next) {
    //     try {
    //       let id = req.params.id || {}
    //       let concert = await ConcertsDAO.getConcertByID(id)
    //       if (!concert) {
    //         res.status(404).json({ error: "Not found" })
    //         return
    //       }
    //       res.json(concert)
    //     } catch (e) {
    //       console.log(`api, ${e}`)
    //       res.status(500).json({ error: e })
    //     }
    //   }
}