import moment from "moment";
import "moment-timezone";

// TODO: ユーザのタイムゾーン予測など
const userTimezone = "Asia/Tokyo";

export const convertUtcToUserTimezone = (utcDateString: string): string => {
  const utcDate = moment.utc(utcDateString);
  return `${utcDate.format("YYYY-MM-DD HH:mm:ss")}UTC`;
};
