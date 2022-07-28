import request from "./request";
import { IParamObj } from "../types";

const API_KEY = process.env.REACT_APP_API;

const BASE_URL = "https://pixabay.com/api/";
const defaultParam = {
  key: API_KEY!,
  // 환경변수는 값이 없으면 undefined 이기 때문에 뒤쪽에 !를 붙여 준다
  // ! = non null assertion 이 값은 없을 수가 없다!
  // 또는 || 로 "" 빈 문자열을 넣어 준다
  // key: API_KEY || "",
  safesearch: "true",
};

const getWallPapers = async (paramObj: IParamObj) => {
  const params = new URLSearchParams({
    ...defaultParam,
    ...paramObj,
  }).toString();
  const result = await request(`${BASE_URL}?${params}`);
  return result;
};
export default getWallPapers;
