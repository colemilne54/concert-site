import http from "../http-common";

class ConcertDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

    //   /id/${id}
  get(id) {
    return http.get(`?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 

  createConcert(data) {
    return http.post("/", data);
  }

  updateConcert(data) {
    return http.put("/", data);
  }

  deleteConcert(id, userId) {
    return http.delete(`/?id=${id}`, {data:{user_id: userId}});
  }

  getGenres(id) {
    return http.get(`/genres`);
  }

}

export default new ConcertDataService();