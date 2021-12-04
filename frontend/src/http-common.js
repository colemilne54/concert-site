import axios from "axios";

export default axios.create({
  baseURL: "http://csci331.cs.montana.edu:5040/api/v1/concerts",
  headers: {
    "Content-type": "application/json"
  }
});