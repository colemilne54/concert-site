import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5040/api/v1/concerts",
  headers: {
    "Content-type": "application/json"
  }
});