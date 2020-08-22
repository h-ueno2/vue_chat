import { ChatUser } from './type';

export default class Room {
  /** Room識別コード */
  private code: string = '';
  /** ルーム名称 */
  private name: string = '';
  /** メンバーのID一覧 */
  private memberIds: Array<[string, boolean]> = [];
  /** チャットユーザー一覧 */
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

  public setMembersId(ids: Array<[string, boolean]>) {
    this.memberIds = ids;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getMemberIds(): Array<[string, boolean]> {
    return this.memberIds;
  }
}
