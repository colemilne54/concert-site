import axios from "axios";

export default axios.create({
  baseURL: "https://csci331.cs.montana.edu:5040/api/v1/concerts",
  headers: {
    "Content-type": "application/json"
  }
});