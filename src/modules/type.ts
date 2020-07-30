export interface Message {
  /** Key */
  key?: string;

  /** ユーザのUID */
  userUid: string;

  /** メッセージ内容 */
  text: string;

  name: string;
}
