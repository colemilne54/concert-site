import ConcertsDAO from "../dao/concertsDAO.js"

export default class ConcertsController {
    static async apiGetConcerts(req, res, next) {
        const concertsPerPage = req.query.concertsPerPage ? parseInt(req.query.concertsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.venueType) {
            filters.venueType = req.query.venueType
        } else if (req.query.genre) {
            filters.genre = req.query.genre
        } else if (req.query.venue_name) {
            filters.venue_name = req.query.venue_name
        } else if (req.query.bands) {
            filters.bands = req.query.bands
        } else if (req.query.city) {
            filters.city = req.query.city
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
            const venue_name = req.body.venue_name
            const bands = req.body.bands
            const venueType = req.body.venueType
            const genre = req.body.genre
            const date = req.body.date
            const link = req.body.link
            const state = req.body.state
            const city = req.body.city
            const img_link = req.body.img_link
            const address = {
                street: req.body.street,
                zipcode: req.body.zipcode
            }
            const userInfo = {
                userName: req.body.user_name,
                userId: req.body.user_id
            }

            const ConcertResponse = await ConcertsDAO.addConcert(
                // concertId,
                venue_name,
                venueType,
                bands,
                userInfo,
                address,
                genre,
                date,
                link,
                state,
                city,
                img_link
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

    static async apiGetConcertVenueTypes(req, res, next) {
        try {
          let venueTypes = await ConcertsDAO.getVenueTypes()
          res.json(venueTypes)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
    }

}