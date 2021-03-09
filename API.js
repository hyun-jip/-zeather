import axios from "axios";

const API_KEY = "ee2d92f8f7c100c564ce72e5ceb8a753";

export const getData = async () => {
  const data = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude={part}&appid=${API_KEY}`
  );
  return console.log(data);
};
