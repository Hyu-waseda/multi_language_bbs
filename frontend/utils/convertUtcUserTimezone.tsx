import moment from "moment";

// TODO: ユーザのタイムゾーン予測など
const userTimezone = "Asia/Tokyo";

export const convertUtcToUserTimezone = (utcDateString: string): string => {
  const utcDate = moment.utc(utcDateString);
  const userDate = utcDate.tz(userTimezone).format("YYYY-MM-DD HH:mm:ss");
  return `${userDate}JST`;
};
