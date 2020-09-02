import { ChatUser } from './type';

export default class Room {
  /** Room識別コード */
  private code: string = '';
  /** ルーム名称 */
  private name: string = '';
  /** メンバーのID一覧 */
  private memberIds: string[] = [];
  /** チャットユーザー一覧 */
  private members: ChatUser[] = [];

  constructor(code?: string, name?: string, memberIds?: string[], members?: ChatUser[]) {
    this.code = code || '';
    this.name = name || '';
    this.memberIds = memberIds || [];
    this.members = members || [];
    }

  /**
   * membersから引数userUidに対応するChatUserを取得する。
   * 対象のUserがmemberに存在しなければundefinedを返却する。
   */
  public getMember(userUid: string): ChatUser | undefined {
    if (!this.existsMemberUid(userUid)) {
      return;
    }
    return this.members.find((member) => {
      return member.uid === userUid;
    });
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getMemberIds(): string[] {
    return this.memberIds;
  }

  /**
   * Roomメンバーに引数userUidに対応するユーザがいた場合にtrueを返却します。
   * @param userUid 確認対象ユーザのuid
   */
  public existsMemberUid(userUid: string): boolean {
    return this.memberIds.includes(userUid);
  }
}
