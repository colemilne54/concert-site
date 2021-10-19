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

//   static async apiGetConcertGenres(req, res, next) {
//     try {
//       let genres = await ConcertsDAO.getGenres()
//       res.json(genres)
//     } catch (e) {
//       console.log(`api, ${e}`)
//       res.status(500).json({ error: e })
//     }
//   }
}