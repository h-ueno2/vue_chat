import DateFormatter, { FormatType } from '@/modules/util/DateFormatter';

describe('DateFormatter', (): void => {
  describe('format', (): void => {

    const format = 'yyyy-MM-dd HH:mm:ss';

    test('フォーマット通り表示されるか。', (): void => {
      const date = new Date(2020, 7, 12, 23, 12, 34);
      const formatter = new DateFormatter(date);
      expect(formatter.format(format)).toMatch('2020-08-12 23:12:34');
    });

    test('フォーマット通り表示されるか。0埋め確認', (): void => {
      const date = new Date(2020, 7, 1, 2, 3, 1);
      const formatter = new DateFormatter(date);
      expect(formatter.format(format)).toMatch('2020-08-01 02:03:01');
    });

    test('Enumを使用してフォーマット通り表示されるか。yyyy-MM-dd hh:MM:ss形式', (): void => {
      const date = new Date(2020, 7, 12, 23, 12, 34);
      const formatter = new DateFormatter(date);
      expect(formatter.format(FormatType.HYPHEN_DATE_TIME)).toMatch(
        '2020-08-12 23:12:34',
      );
    });

    test('Enumを使用してフォーマット通り表示されるか。yyyy-MM-dd形式', (): void => {
      const date = new Date(2020, 7, 12, 23, 12, 34);
      const formatter = new DateFormatter(date);
      expect(formatter.format(FormatType.HYPHEN_DATE)).toMatch(
        '2020-08-12',
      );
    });

    test('Enumを使用してフォーマット通り表示されるか。yyyyMMddhhMMss形式', (): void => {
      const date = new Date(2020, 7, 12, 23, 12, 34);
      const formatter = new DateFormatter(date);
      expect(formatter.format(FormatType.NOT_SEPARATOR_DATE_TYME)).toMatch(
        '20200812231234',
      );
    });

    test('Enumを使用してフォーマット通り表示されるか。yyyyMMdd形式', (): void => {
      const date = new Date(2020, 7, 12, 23, 12, 34);
      const formatter = new DateFormatter(date);
      expect(formatter.format(FormatType.NOT_SEPARATOR_DATE)).toMatch(
        '20200812',
      );
    });
  });
});
