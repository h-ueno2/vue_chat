import { ChatUser } from './type';

export default class Room {
  /** Room識別コード */
  private code: string = '';
  /** ルーム名称 */
  private name: string = '';
  /** チャットユーザーid一覧 */
  private members: ChatUser[] = [];

  constructor(code?: string, name?: string, members?: ChatUser[]) {
    this.code = code || '';
    this.name = name || '';
    this.members = members || [];
  }

  public getMember(userUid: string): ChatUser | undefined {
    return this.members.find((member) => {
      return member.uid === userUid;
    });
  }
}
