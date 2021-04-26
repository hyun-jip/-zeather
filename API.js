import axios from "axios";
import { AppState } from "react-native";

const API_KEY = "ee2d92f8f7c100c564ce72e5ceb8a753";

export const getWeather = async (LAT, LONG) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT || 0}&lon=${
        LONG || 0
      }&exclude={part}&appid=${API_KEY}&lang=kr&units=metric`
    );
    return [data || result, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};
