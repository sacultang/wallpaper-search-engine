import request from "./request";
const API_KEY = process.env.REACT_APP_API;
const BASE_URL = "https://pixabay.com/api/";

const getWallPapers = async () => {
  const result = await request(`${BASE_URL}?key=${API_KEY}`);
  return result;
};
export default getWallPapers;
