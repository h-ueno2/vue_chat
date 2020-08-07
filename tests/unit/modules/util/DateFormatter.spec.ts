import DateFormatter from '@/modules/util/DateFormatter';


describe('DateFormatter', (): void => {
  describe('format', (): void => {

    const format = 'yyyy-MM-dd hh:mm:ss';

    test('フォーマット通り表示されるか。', (): void => {
      const date = new Date(2020, 7, 12, 23, 12, 34);
      const formatter = new DateFormatter(date);
      expect(formatter.format(format)).toMatch('2020-08-12 23:12:34');
    });

    test('フォーマット通り表示されるか。0埋め確認', (): void => {
      const date = new Date(2020, 7, 1, 2, 3, 1);
      const formatter = new DateFormatter(date);
      const expected = '2020-08-01 02:03:01';

      expect(formatter.format(format)).toMatch(expected);
    });
  });
});
