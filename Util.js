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

export const formatFutureDate = (time) => {
  const unix_month = moment.unix(time + 32400).format("M");
  const unix_day = moment.unix(time + 32400).format("D");
  const unix_weekday = moment.unix(time + 32400).day();
  const weekdayArr = ["일", "월", "화", "수", "목", "금", "토"];

  const unix_sumFutureDate = `${unix_month}월 ${unix_day}일 ${weekdayArr[unix_weekday]}요일`;
  return unix_sumFutureDate;
};
