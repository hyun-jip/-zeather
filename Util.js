import moment from "moment";

export const formatTime = (time) => {
  const theTime = new Date(time);
  return theTime.toLocaleTimeString("ko-KR");
};

export const formatSunTime = (time) => {
  const unix_time = moment.unix(time + 32400).format("h:mm");

  return unix_time;
};

export const formatSunAMPM = (time) => {
  const AMPM = moment.unix(time + 32400).format("A");

  return AMPM;
};

export const formatHour = (time) => {
  const unix_hour = moment.unix(time + 32400).format("H");

  return unix_hour;
};
