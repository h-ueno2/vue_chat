
/**
 * 日付のフォーマッター
 */
export class DateFormatter {
  constructor(private date: Date) {
  }

  /**
   * 日付フォーマット
   * @param format フォーマットしたい形式を表現した文字列。
   * yyyy: 年（例:2018）
   * MM: 月（例：08）
   * dd: 日（例：04）
   * hh: 時
   * mm: 分
   * ss: 秒
   */
  public format(format: string): string {
    const year = this.date.getFullYear().toString();
    const month = ('0' + (1 + this.date.getMonth())).slice(-2);
    const day = ('0' + this.date.getDate().toString()).slice(-2);
    const hour = ('0' + this.date.getHours()).slice(-2);
    const minute = ('0' + this.date.getMinutes()).slice(-2);
    const second = ('0' + this.date.getSeconds()).slice(-2);

    return format
      .replace(/yyyy/g, year)
      .replace(/MM/g, month)
      .replace(/dd/g, day)
      .replace(/HH/g, hour)
      .replace(/mm/g, minute)
      .replace(/ss/g, second);
  }
}

export const enum FormatType {
  HYPHEN_DATE_TIME = 'yyyy-MM-dd HH:mm:ss',
}
