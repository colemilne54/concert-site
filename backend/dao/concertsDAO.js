import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
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
            if ("bands" in filters) {
                query = { $text: { $search: filters["bands"] } }
            } else if ("genre" in filters) {
                query = { "genre": { $eq: filters["genre"] } }
            } else if ("venueType" in filters) {
                query = { "venueType": { $eq: filters["venueType"] } }
            } else if ("zipcode" in filters) {
                query = { "zipcode": { $eq: filters["zipcode"] } }
            } else if ("city" in filters) {
                query = { "city": { $eq: filters["city"] } }
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

    static async addConcert(venueName, venueType, bands, user, address, genre, date, link, state, city, img_link) {
        try {
            const concertDoc = {
                user_name: user.userName,
                user_id: user.userId,
                bands: bands,
                venue_name: venueName,
                venueType: venueType,
                zipcode: address.zipcode,
                street: address.street,
                genre: genre,
                date: date,
                link: link,
                state: state,
                city: city,
                img_link: img_link
            }

            return await concerts.insertOne(concertDoc)
        } catch (e) {
            console.error(`Unable to post concert: ${e}`)
            return { error: e }
        }
    }

    static async updateConcert(concertId, userId, bands) {
        try {
            const updateResponse = await concerts.updateOne(
                { user_id: userId, _id: ObjectId(concertId) },
                { $set: { bands: bands }},
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update concert: ${e}`)
            return { error: e }
        }
    }

    static async deleteConcert(concertId, userId) {
        try {
            const deleteResponse = await concerts.deleteOne({
                _id: ObjectId(concertId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete concert: ${e}`)
            return { error: e }
        }
    }

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

    static async getVenueTypes() {
        let venueTypes = []
        try {
            venueTypes = await concerts.distinct("venueType")
            return venueTypes
        } catch (e) {
            console.error(`Unable to get venue types, ${e}`)
            return venueTypes
        }
    }
}
