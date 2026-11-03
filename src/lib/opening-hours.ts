const OPENS_AT_MINUTE = 10 * 60;
const CLOSES_AT_MINUTE = 20 * 60;

const yerevanClock = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Yerevan", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

/* The boutique keeps Yerevan hours every day, whatever the visitor's time zone */
export const isOpenAt = (moment: Date) => {
  const [hours, minutes] = yerevanClock.format(moment).split(":").map(Number);
  const minuteOfDay = hours * 60 + minutes;
  return minuteOfDay >= OPENS_AT_MINUTE && minuteOfDay < CLOSES_AT_MINUTE;
};
