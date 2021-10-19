// import mongodb from "mongodb"
// const ObjectId = mongodb.ObjectID
let concerts

export default class ConcertsDAO {
  static async injectDB(conn) {
    if (concerts) {
      return
    }
    try {
      concerts = await conn.db(process.env.CONCERTS_NS).collection("concerts")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in concertsDAO: ${e}`,
      )
    }
  }

  static async getConcerts({
    filters = null,
    page = 0,
    concertsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("band" in filters) {
        query = { $text: { $search: filters["band"] } }
      } else if ("genre" in filters) {
        query = { "genre": { $eq: filters["genre"] } }
      } else if ("zipcode" in filters) {
        query = { "concert.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await concerts
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { concertsList: [], totalNumConcerts: 0 }
    }

    const displayCursor = cursor.limit(concertsPerPage).skip(concertsPerPage * page)

    try {
      const concertsList = await displayCursor.toArray()
      const totalNumConcerts = await concerts.countDocuments(query)

      return { concertsList, totalNumConcerts }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { concertsList: [], totalNumConcerts: 0 }
    }
  }
//   static async getConcertByID(id) {
//     try {
//       const pipeline = [
//         {
//             $match: {
//                 _id: new ObjectId(id),
//             },
//         },
//               {
//                   $lookup: {
//                       from: "reviews",
//                       let: {
//                           id: "$_id",
//                       },
//                       pipeline: [
//                           {
//                               $match: {
//                                   $expr: {
//                                       $eq: ["$concert_id", "$$id"],
//                                   },
//                               },
//                           },
//                           {
//                               $sort: {
//                                   date: -1,
//                               },
//                           },
//                       ],
//                       as: "reviews",
//                   },
//               },
//               {
//                   $addFields: {
//                       reviews: "$reviews",
//                   },
//               },
//           ]
//       return await concerts.aggregate(pipeline).next()
//     } catch (e) {
//       console.error(`Something went wrong in getConcertByID: ${e}`)
//       throw e
//     }
//   }

  static async getGenres() {
    let genres = []
    try {
      genres = await concerts.distinct("genre")
      return genres
    } catch (e) {
      console.error(`Unable to get genres, ${e}`)
      return genres
    }
  }
}
