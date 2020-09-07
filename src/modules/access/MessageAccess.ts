import firebase from 'firebase';
import { Message } from '@/modules/type';


export default class MessageAccess {

  /**
   * メッセージを取得します。
   * @param roomCd 対象RoomCd
   * @param callback メッセージ追加時の処理
   */
  public static async childAdded(
    roomCd: string,
    callback: (a: firebase.database.DataSnapshot, b?: string | null) => any,
  ) {
    firebase.database().ref('message/' + roomCd)
      .limitToLast(10).on('child_added', callback);
  }

  /**
   * メッセージを追加します。
   * @param roomCd 対象のRoomCd
   * @param message 追加するメッセージ
   * @param onComplete 追加完了後の動作
   */
  public static async push(
    roomCd: string,
    message: Message,
    onComplete: (a: Error | null) => any,
  ) {
    firebase.database().ref('message/' + roomCd).push(message, onComplete);
  }
}
