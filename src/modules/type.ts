export interface Message {
  /** Key */
  key?: string;

  /** ユーザのUID */
  userUid: string;

  /** メッセージ内容 */
  text: string;

  /** 投稿日時 */
  postedAt: string;
}

export interface ChatUser {
  /** uid */
  uid: string;

  /** ユーザ名 */
  name: string;

  /** email */
  email: string;
}
