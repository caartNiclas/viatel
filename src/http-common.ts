import axios from "axios";

export const API_DEFAULT_PARAMS = {
  api_key: "77196fb1ca9f9b50452093422a59735c",
};

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-type": "application/json",
  },
});
