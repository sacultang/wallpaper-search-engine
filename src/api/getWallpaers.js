import request from "./request";
const API_KEY = process.env.REACT_APP_API;
const BASE_URL = "https://pixabay.com/api/";
const defaultParam = {
  key: API_KEY,
};

const getWallPapers = async (paramObj) => {
  const params = new URLSearchParams({
    ...defaultParam,
    ...paramObj,
  }).toString();
  const result = await request(`${BASE_URL}?${params}`);
  return result;
};
export default getWallPapers;
