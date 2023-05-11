import dayjs from "dayjs";

export default class DataFormatter {
  static format(data, format) {
    return dayjs(data).format(format);
  }
}
